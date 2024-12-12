import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NAVER_CLIENT_ID = 'a4F8pqh9S4F7RKdzEH8E'; // 여기에 실제 CLIENT_ID를 입력하세요
const NAVER_CLIENT_SECRET = 'y_UlhDvqTZ'; // 여기에 실제 CLIENT_SECRET을 입력하세요

const CategoryPage = ({ route }) => {
  const { category } = route.params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);  // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 확인

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
        headers: {
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
        params: {
          query: category,
          display: 10,
          start: (page - 1) * 10 + 1,  // 페이지에 맞는 start 값
          sort: 'sim',
        },
      });
      setBlogs((prevBlogs) => [...prevBlogs, ...response.data.items]);  // 기존 블로그에 새로운 블로그 항목 추가
      if (response.data.items.length < 10) {
        setHasMore(false);  // 더 이상 데이터가 없으면 hasMore를 false로 설정
      }
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);  // 카테고리 페이지가 변경될 때마다 호출
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);  // 페이지 증가
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} 관련 블로그 글</Text>
      <FlatList
        data={blogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View style={styles.blogItem}>
              <Text style={styles.blogTitle}>{item.title.replace(/<b>|<\/b>/g, '')}</Text>
              <Text style={styles.blogDescription}>{item.description.replace(/<b>|<\/b>/g, '')}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMore}  // 페이지 끝에 도달했을 때 loadMore 호출
        onEndReachedThreshold={0.5}  // 50%만큼 내려갔을 때 loadMore 호출
        ListFooterComponent={renderFooter}  // 하단에 로딩 인디케이터 추가
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  blogItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  blogDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default CategoryPage;