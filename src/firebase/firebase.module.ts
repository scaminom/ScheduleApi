import { Module } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { FIREBASE_PROVIDER } from './constans'
import { FirebaseService } from './firebase.service'
import * as fs from 'fs'
import * as path from 'path'

const credentialsPath =
  process.env.RENDER_SECRET_FILE_PATH ||
  path.join(__dirname, '../../fb/credentials.json')

const serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'))

const firebaseProvider = {
  provide: FIREBASE_PROVIDER,
  useFactory: () => {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  },
}

@Module({
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
