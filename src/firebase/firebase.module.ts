import { Module } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'
import { FIREBASE_PROVIDER } from './constans'
import { FirebaseService } from './firebase.service'

const firebaseProvider = {
  provide: FIREBASE_PROVIDER,
  useFactory: () => {
    return admin.initializeApp({
      credential: applicationDefault(),
    })
  },
}

@Module({
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
