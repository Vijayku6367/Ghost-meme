import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { RealFHEEncryption } from '@/lib/fhe-real'

export async function POST(request: NextRequest) {
  try {
    const { memeId } = await request.json()

    const meme = await prisma.meme.findUnique({
      where: { id: memeId }
    })

    if (!meme) {
      return NextResponse.json(
        { error: 'Meme not found' },
        { status: 404 }
      )
    }

    if (meme.isEncrypted) {
      return NextResponse.json(
        { error: 'Meme is already encrypted' },
        { status: 400 }
      )
    }

    // Initialize FHE
    await RealFHEEncryption.initialize()

    // Encrypt with real FHE
    const encryptedTopText = meme.topText 
      ? await RealFHEEncryption.encryptText(meme.topText)
      : null
    
    const encryptedBottomText = meme.bottomText 
      ? await RealFHEEncryption.encryptText(meme.bottomText)
      : null
    
    const encryptedData = await RealFHEEncryption.encryptAnalytics({
      originalTopText: meme.topText,
      originalBottomText: meme.bottomText,
      encryptedAt: new Date().toISOString(),
      encryptionMethod: 'Zama-FHE'
    })

    // Update meme
    const updatedMeme = await prisma.meme.update({
      where: { id: memeId },
      data: {
        topText: encryptedTopText,
        bottomText: encryptedBottomText,
        encryptedData,
        isEncrypted: true
      }
    })

    return NextResponse.json({
      success: true,
      meme: {
        id: updatedMeme.id,
        isEncrypted: updatedMeme.isEncrypted,
        encryptedAt: new Date().toISOString()
      },
      message: 'Meme encrypted with Zama FHE successfully!',
      encryptionType: 'Zama-FHE'
    })

  } catch (error) {
    console.error('FHE Encryption error:', error)
    return NextResponse.json(
      { 
        error: 'FHE Encryption failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
