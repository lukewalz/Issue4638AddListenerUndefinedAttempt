import {createRealmContext, AppProvider, UserProvider} from '@realm/react';
import {useRef} from 'react';
import App from './App';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import Realm from 'realm';

export const rideSchema = {
  name: 'ride',
  properties: {
    _id: 'objectId?',
    date_completed: 'date?',
    date_created: 'date?',
    date_requested: 'date?',
    duration: 'double?',
    locations: 'string[]',
    notes: 'string?',
    passengers: 'int?',
    service: 'string?',
    status: 'int?',
    tip: 'double?',
  },
  primaryKey: '_id',
};

export const userSchema = {
  name: 'user',
  properties: {
    _id: 'objectId',
    account_type: 'int?',
    address: 'string?',
    auth_id: 'string',
    city: 'string?',
    creation_date: 'date?',
    email: 'string?',
    first_name: 'string?',
    hours: 'int?',
    last_name: 'string?',
    notification_keys: 'string[]',
    phone: 'string?',
    plan: 'int?',
    profile_image: 'string?',
    rides: 'ride[]',
    state: 'string?',
    zip: 'string?',
  },
  primaryKey: '_id',
};

const config = {
  schema: [userSchema, rideSchema],
};

export const {RealmProvider, useObject, useQuery, useRealm} =
  createRealmContext(config);

const syncConfig = {
  partitionValue: null as any,
};

export default () => {
  const appRef = useRef<Realm.App>(null);

  const login = async () => {
    if (!appRef.current) {
      return;
    }

    await appRef.current.logIn(Realm.Credentials.anonymous());
    console.log('Logged in');
  };

  return (
    <SafeAreaView>
      <AppProvider id="application-0-sqext" appRef={appRef}>
        <UserProvider fallback={<Button title="Login" onPress={login} />}>
          <RealmProvider sync={syncConfig} fallback={<Text>Loading</Text>}>
            <App />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};
