import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, } from 'react-native';
import { sortArray } from '../../Services/largestTRDT';
import Icon from 'react-native-vector-icons/AntDesign';
import { ListItem } from './ListItem';
import { MemoizedItem } from './ListItem';
import { fetchData } from '../../Services/fetch';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';
import { generalStyles } from '../../generalStyles';



const ListFooter = ({ resultsEnd }) => {
  return (
    !resultsEnd ? (<ActivityIndicator size={'large'} color={COLORS.redPrimary} style={styles.loader} />) : <Text style={styles.footer}>No more results</Text>
  )
}



export const SearchResult = ({ route }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState();
  // const [expandAll, setExpandedAll] = useState(false);
  const [sqlOffset, setSQLOffset] = useState(null);
  const [loader, setLoader] = useState(false);
  const [resultsEnd, setResultsEnd] = useState(false)
  const [canFetch, setCanFetch] = useState();

  const { postData } = route.params;


  const hadleShownData = async () => {
    setLoader(true)
    const payload = await fetchData('https://ccmde1.cloudon.gr/softone/searchCustomer.php', postData);
    if (payload) {
      let sorted = sortArray(payload)
      setSQLOffset(sorted[0].TRDR)
      setData(sorted);
      setLoader(false)
    }
  }


  useEffect(() => {
    hadleShownData();
  }, []);

  const fetchOffset = async () => {
    if (sqlOffset !== null) {
      postData.OFFSET = sqlOffset.toString();
      const res = await fetchData(
        'https://ccmde1.cloudon.gr/softone/searchCustomer.php',
        postData,
      );
      if (res !== null) {
        let sort = sortArray(res)
        setSQLOffset(sort[0].TRDR)
        setData([...data, ...sort]);
      }
      if (res == null) {
        console.log('res null')
        setResultsEnd(true);
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
      <ListItem item={item} index={index} loader={loader} />)
  };

  const keyExtractor = (item, index) => {
    { return index.toString() }
  };

  const handleLoadMore = async () => {
    setLoader(true);
    if (canFetch) {
      await fetchOffset()
      setCanFetch(false)
    }
    setLoader(false)

  };

  const canFetching = () => {
    setCanFetch(true)
  }


  return (
    <View style={generalStyles.body} >
      <View style={styles.container}>
        {/* <View style={{ height: 80 }}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search with a name"
          />
        </View> */}
        <View style={styles.flatlistView}>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={RenderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => loader && <ListFooter resultsEnd={resultsEnd} />}
            onScrollBeginDrag={canFetching}
            initialNumToRender={9}
          />
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

  flatlistView: {
    flex: 1,
    // padding: 5,
    marginVertical: 10
  },

  closeTabs: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    marginBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  loader: {
    padding: 10
  },

  footer: {
    height: 50,
    backgroundColor: 'red'
  }
});
