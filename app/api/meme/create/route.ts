import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { uploadImage } from '@/lib/storage'
import { FHEEncryption } from '@/lib/fhe'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const image = formData.get('image') as File
    const topText = formData.get('topText') as string
    const bottomText = formData.get('bottomText') as string
    const fontColor = formData.get('fontColor') as string || '#FFFFFF'
    const fontSize = parseInt(formData.get('fontSize') as string) || 48
    const shouldEncrypt = formData.get('encrypt') === 'true'
    const creatorId = formData.get('creatorId') as string

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // Upload image
    const { url: imageUrl } = await uploadImage(image)

    // Encrypt text if requested
    let encryptedTopText = topText
    let encryptedBottomText = bottomText
    let encryptedData = null

    if (shouldEncrypt && topText) {
      encryptedTopText = FHEEncryption.encrypt(topText)
      encryptedBottomText = FHEEncryption.encrypt(bottomText)
      encryptedData = FHEEncryption.encryptAnalytics({
        topText,
        bottomText,
        encryptedAt: new Date().toISOString()
      })
    }

    // Create meme in database
    const meme = await prisma.meme.create({
      data: {
        title: `${topText || ''} ${bottomText || ''}`.trim() || 'Untitled Meme',
        topText: encryptedTopText,
        bottomText: encryptedBottomText,
        imageUrl,
        fontColor,
        fontSize,
        isEncrypted: shouldEncrypt,
        encryptedData,
        creatorId,
        tags: ['new'],
        views: 0,
        shares: 0,
        likes: 0
      }
    })

    // Create analytics entry
    await prisma.analytics.create({
      data: {
        memeId: meme.id,
        encryptedViews: FHEEncryption.encryptAnalytics({ count: 0 }),
        encryptedShares: FHEEncryption.encryptAnalytics({ count: 0 }),
        encryptedLikes: FHEEncryption.encryptAnalytics({ count: 0 }),
        trendScore: 0.1
      }
    })

    return NextResponse.json({
      success: true,
      meme,
      message: shouldEncrypt 
        ? 'Meme created and encrypted successfully!' 
        : 'Meme created successfully!'
    })

  } catch (error) {
    console.error('Error creating meme:', error)
    return NextResponse.json(
      { error: 'Failed to create meme' },
      { status: 500 }
    )
  }
}
