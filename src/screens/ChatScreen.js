import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Tab, TabView} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
// import {requestUserPermission} from '../components/pushnotifications';

let ActiveChats = () => {
  const navigation = useNavigation();
  const [chats, setChats] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleChatPress = chat => {
    navigation.navigate('IndividualChat', {chat});
  };

  const refreshPage = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
      }>
      {chats ? (
        chats.map(chat => (
          <TouchableOpacity key={chat.id} onPress={() => handleChatPress(chat)}>
            <View style={styles.item}>
              <Image source={{uri: chat.avatar}} style={styles.avatar} />
              <View style={styles.details}>
                <Text style={styles.name}>{chat.name}</Text>
                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.time}>{chat.time}</Text>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={[styles.loadercontainer, styles.loaderhorizontal]}>
          <ActivityIndicator size="large" color="#217eac" />
        </View>
      )}
    </ScrollView>
  );
};

let ClosedChats = () => {
  const navigation = useNavigation();
  const [chats, setChats] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleChatPress = chat => {
    navigation.navigate('IndividualChat', {chat});
  };

  const refreshPage = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
      }>
      {chats ? (
        chats.map(chat => (
          <TouchableOpacity key={chat.id} onPress={() => handleChatPress(chat)}>
            <View style={styles.item}>
              <Image source={{uri: chat.avatar}} style={styles.avatar} />
              <View style={styles.details}>
                <Text style={styles.name}>{chat.name}</Text>
                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.time}>{chat.time}</Text>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={[styles.loadercontainer, styles.loaderhorizontal]}>
          <ActivityIndicator size="large" color="#217eac" />
        </View>
      )}
    </ScrollView>
  );
};

let ChatHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Image
          source={require('../../assets/twixor_hd_icon.png')}
          style={styles.logo}
        />
        <View style={styles.status}>
          <Text style={styles.logotext}>Chats</Text>
          <View
            style={[styles.statusIndicator, {backgroundColor: '#5ED430'}]}
          />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity>
          <View>
            <Image
              source={require('../../assets/notification_64.png')}
              style={styles.icon}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/inside_menu_64.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

let Tabs = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
          borderBottomWidth: 2,
          borderBottomColor: '#2f81ad',
        }}
        variant="transparent">
        <Tab.Item
          title="Active Chats"
          titleStyle={{fontSize: 15, color: '#2f81ad'}}
        />
        <Tab.Item
          title="Closed Chats"
          titleStyle={{fontSize: 15, color: 'gray'}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <ActiveChats />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <ClosedChats />
        </TabView.Item>
      </TabView>
    </>
  );
};

let ChatScreen = () => {
  // React.useEffect(() => {
  //   requestUserPermission()
  //     .then(jsonData => {
  //       console.log('data', jsonData);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader />
      <Tabs />
    </SafeAreaView>
  );
};

let styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 16,
    marginTop : 8,
    marginBottom : 8
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
    marginTop: 10,
    marginLeft: 7,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
    marginTop: 8,
  },
  logotext: {
    fontSize: 22,
    fontWeight: '600',
    color: '#555555',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  lastMessage: {
    fontSize: 14,
    color: '#777777',
  },
  info: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 4,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  loadercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderhorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50%',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
};

export default ChatScreen;
