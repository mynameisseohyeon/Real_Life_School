import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NAVER_CLIENT_ID = 'a4F8pqh9S4F7RKdzEH8E'; // 실제 CLIENT_ID를 입력하세요
const NAVER_CLIENT_SECRET = 'y_UlhDvqTZ'; // 실제 CLIENT_SECRET을 입력하세요

const NewsPage = ({ route }) => {
  const { category } = route.params; // route에서 category 받아오기
  const [news, setNews] = useState([]); // 뉴스 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [page, setPage] = useState(1);  // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 이상 데이터가 없는지 확인

  const fetchNews = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
        headers: {
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
        params: {
          query: category,
          display: 10,
          start: (page - 1) * 10 + 1,  // 페이지에 맞는 start 값
          sort: 'sim', // 정렬 방법: sim(정확도순), date(날짜순)
        },
      });

      // 뉴스 항목 처리
      setNews((prevNews) => [...prevNews, ...response.data.items]);

      if (response.data.items.length < 10) {
        setHasMore(false);  // 더 이상 데이터가 없으면 hasMore를 false로 설정
      }
    } catch (error) {
      console.error('Error fetching news:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);  // 페이지가 변경될 때마다 호출
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);  // 페이지 증가
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#3498db" /> : null; // 로딩 인디케이터 색상 변경
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} 관련 뉴스</Text>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View style={styles.newsItem}>
              <Text style={styles.newsTitle}>
                {item.title.replace(/<b>|<\/b>/g, '')} {/* <b> 태그 제거 */}
              </Text>
              <Text style={styles.newsDescription}>
                {item.description.replace(/<b>|<\/b>/g, '')} {/* <b> 태그 제거 */}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMore}  // 페이지 끝에 도달했을 때 loadMore 호출
        onEndReachedThreshold={0.5}  // 50%만큼 내려갔을 때 loadMore 호출
        ListFooterComponent={renderFooter}  // 하단에 로딩 인디케이터 추가
        contentContainerStyle={styles.flatListContent}  // 내용의 여백 조정
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',  // 밝은 배경색
  },
  title: {
    fontSize: 24,  // 제목 크기
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',  // 다크 색상
  },
  flatListContent: {
    paddingBottom: 20, // 리스트 하단 여백
  },
  newsItem: {
    backgroundColor: '#fff',
    padding: 20,  // 패딩 넉넉하게
    marginBottom: 20,  // 카드 간격
    borderRadius: 10,  // 부드러운 둥근 모서리
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    width: '99%',  // 카드 너비를 100%로 설정
    maxWidth: 400,  // 최대 너비를 설정하여 화면에서 너무 커지지 않도록 방지
    alignSelf: 'center',  // 카드가 화면의 가운데에 위치하도록 설정
  },
  newsTitle: {
    fontSize: 18,  // 제목 크기
    fontWeight: 'bold',
    color: '#34495e',  // 짙은 색상
    marginBottom: 10,  // 제목과 본문 간격
  },
  newsDescription: {
    fontSize: 14,  // 본문 크기
    color: '#7f8c8d',  // 밝은 그레이 색상
    lineHeight: 20,  // 줄 간격
  },
});

export default NewsPage;
