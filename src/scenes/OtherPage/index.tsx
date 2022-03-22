import GenericHeader from '@components/GenericHeader';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
import { useNavigation, StackActions } from '@react-navigation/native';
import { getAllFilmsRequest } from '@redux/actions';
import BugseeActions from '@redux/bugsee/actions';
import * as React from 'react';
import { useCallback, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import styles from './styles';

const OtherPage: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const popAction = useCallback(() => StackActions.pop(), []);

  const goBack = useCallback(() => {
    navigation.dispatch(popAction);
  }, [navigation, popAction]);

  useEffect(() => {
    dispatch(getAllFilmsRequest({ limit: 30 }));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }) => (
      <View key={item.key} style={styles.listItemContainer}>
        <TouchableOpacity onPress={item.onPress}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemSubtitle}>{item.description}</Text>
        </TouchableOpacity>
      </View>
    ),
    [],
  );

  return (
    <NHCSafeAreaView>
      <GenericHeader onBackClicked={goBack} title={t('AnotherPage:OtherPage')} />

      <FlatList
        data={BugseeActions}
        style={styles.container}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </NHCSafeAreaView>
  );
};

export default React.memo(OtherPage);