import { Module } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { FIREBASE_PROVIDER } from './constans'
import { FirebaseService } from './firebase.service'
import { serviceAccount } from 'src/config/config'

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
