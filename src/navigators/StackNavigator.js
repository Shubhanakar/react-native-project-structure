import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Login from '../screens/Auth/Login';
import Welcome from '../screens/Auth/Welcome';
import Signup from '../screens/Auth/Signup';
import Splash from '../screens/Auth/Splash';
import EditProfile from '../screens/Profile/EditProfile';
import CreateAccount from '../screens/Auth/CreateAccount';
import Jobs from '../screens/Jobs/Jobs';
import Settings from '../screens/Settings/Settings';
import AddJob from '../screens/Jobs/AddJob';
import AddJobArea from '../screens/Jobs/AddJobArea';
import KeepJobs from '../screens/Settings/KeepJobs';
import ManageForms from '../screens/Settings/ManageForms';
import ViewJob from '../screens/Jobs/ViewJob';
import EditJob from '../screens/Jobs/EditJob';
import DrawerNavigator from './DrawerNavigator';
import AddNewJob from '../screens/Jobs/AddNewJob';
import JobSummary from '../screens/Jobs/JobSummary';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const TokenReducer = useSelector(state => state.TokenReducer);

  if (TokenReducer.loading === true) {
    return <Splash />;
  } else {
    return TokenReducer.token === null ? (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'Welcome'}
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Signup'}
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'CreateAccount'}
            component={CreateAccount}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'DrawerNavigator'}
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'EditProfile'}
            component={EditProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Jobs'}
            component={Jobs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Settings'}
            component={Settings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'AddJob'}
            component={AddJob}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'AddJobArea'}
            component={AddJobArea}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'KeepJobs'}
            component={KeepJobs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ManageForms'}
            component={ManageForms}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'AddNewJob'}
            component={AddNewJob}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'JobSummary'}
            component={JobSummary}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'ViewJob'}
            component={ViewJob}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'EditJob'}
            component={EditJob}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
