import PropTypes from "prop-types"
import React from "react"
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { connect } from 'react-redux'

import * as collectActions from '../actions/collectActions'

const windowWidth = Dimensions.get("window").width

class ArticleItemView extends React.PureComponent {
  static PropTypes = {
    item: PropTypes.object.isRequired,
    hide: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    outline:PropTypes.bool,
    likeClick:PropTypes.func.isRequired
  };


  static defaultProps = {
    outline:true
  }

  render() {
    const { hide,outline,likeClick,themeColor} = this.props
    const { item,index } = this.props.item
 
    return (
      <TouchableNativeFeedback
        onPress={() => this.props.navigation.navigate("article_detail", item)}  >
        <View style={styles.itemView}>
          {hide ? (
            <View />
          ) : (
            <View style={[styles.chapterWarpper,{backgroundColor:themeColor}]}>
              <Text style={styles.chapterText}>{item.chapterName?item.chapterName:'其他'}</Text>
            </View>
          )}

          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <View style={styles.info}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.niceDate}>{item.niceDate}</Text>
            </View>
          </View>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",true)}
            onPress={() =>likeClick(index,item)}>
            <View style={{ height: 30, width: 30, borderRadius: 15,marginRight:8,justifyContent:'center',alignItems:'center' }}>
              <Icon
                name={(item.collect||!outline)?'md-heart':'md-heart-outline'}
                size={30} color={themeColor}/>
            </View>
          </TouchableNativeFeedback>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  itemView: {
    borderRadius: 5,
    backgroundColor: "white",
    height: 70,
    margin: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  chapterWarpper: {
    height: 70,
    justifyContent: "center",
    width: 15,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  chapterText: {
    color: "white"
  },
  title: {
    fontSize: 18,
    marginHorizontal: 16
  },
  info: {
    flexDirection: "row",
    marginHorizontal: 16
  },

  niceDate: {
    marginLeft: 16
  },
  author: {
    alignSelf: "flex-start"
  },
  textWarpper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: windowWidth,
    width: windowWidth - 16,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    color: "white"
  }
});



export default connect((state) => ({
  themeColor:state.theme.color
}))(ArticleItemView) 
