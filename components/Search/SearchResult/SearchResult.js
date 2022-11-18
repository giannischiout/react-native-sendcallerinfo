import React, { useEffect, useState, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { sortArray } from '../../Services/largestTRDT';
import Icon from 'react-native-vector-icons/AntDesign';
import { ListItem } from './ListItem';
import { MemoizedItem } from './ListItem';
import { fetchData } from '../../Services/fetch';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';
import { generalStyles } from '../../generalStyles';

export const SearchResult = ({ route }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState();
  const [expandAll, setExpandedAll] = useState(false);
  const [sqlOffset, setSQLOffset] = useState(null);
  const [loader, setLoader] = useState(false)
  const { postData } = route.params;



  // console.log('------------------------MASTER DATA: ------------------------------------');
  // console.log(data)

  const hadleShownData = async () => {
    const payload = await fetchData('https://ccmde1.cloudon.gr/softone/searchCustomer.php', postData);
    console.log('PAYLOAD')
    console.log(payload)
    let sorted = sortArray(payload)
    setSQLOffset(sorted[0].TRDR)
    setData(sorted);
    // console.log('------------------------03 FILTER DATA: ------------------------------------');
    // console.log(data)
  }


  useEffect(() => {
    alert('useEffect')
    hadleShownData();
  }, []);

  const fetchOffset = async () => {
    if (sqlOffset !== null) {
      postData.OFFSET = sqlOffset.toString();
      const res = await fetchData(
        'https://ccmde1.cloudon.gr/softone/searchCustomer.php',
        postData,
      );
      if (res) {

        let sort = sortArray(res)
        setSQLOffset(sort[0].TRDR)
        setData([...data, ...sort]);
        // console.log('08')
        // console.log(sort[0].TRDR)
      }
    }
  };

  const expandAllItems = () => {
    setExpandedAll(prev => !prev);
  };

  //Flatlist Items:
  //Create the seperator:
  const ItemSeparatorView = () => {
    return (
      <View style={{ width: '100%', margin: 3 }} />
    );
  };
  //Flatlist Item to be rendered:
  const RenderItem = ({ item, index }) => {
    return (
      <ListItem item={item} index={index} expandAll={expandAll} loader={loader} />)
  };

  const keyExtractor = (item, index) => {
    { return index.toString() }
  };

  const handleLoadMore = async () => {
    setLoader(true);
    await fetchOffset()
    setLoader(false)
  };



  return (
    <View style={generalStyles.body} >
      <View style={styles.container}>
        <View style={{ height: 80 }}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search with a name"
          />
          <TouchableOpacity onPress={expandAllItems} style={styles.closeTabs}>
            <Text>{expandAll ? 'Close All' : 'Open All'}</Text>
            <Icon name={expandAll ? 'up' : 'down'} />
          </TouchableOpacity>
        </View>
        <View style={{ height: '80%' }}>
          <FlatList
            data={data}
            bounces={false}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={RenderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        </View>

        <View style={{ height: 50, padding: 20 }}>
          {loader && <ActivityIndicator />}
        </View>

      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '96%',
    // flex: 1,
    height: '100%'
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: COLORS.redPrimary,
    backgroundColor: '#FFFFFF',
  },



  closeTabs: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    marginBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
