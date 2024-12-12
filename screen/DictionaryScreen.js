import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import axios from 'axios';

const DictionaryScreen = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [terms, setTerms] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const fetchTerms = async () => {
    setLoading(true);
    const apiKey = 'Xr3fwLdlP1OiSvzeBtppseDLww27mgUe9MrZxS/uJ/2r5ckjk3k5Gga3uP8TYqF9aQudNiU0AXvE2PtHy/34/A=='; // 발급받은 인증키 입력
    const url = `https://api.odcloud.kr/api/15044350/v1/uddi:88825fbb-6d63-4209-9e51-c777cb236f8b?page=${page}&perPage=${perPage}&returnType=JSON&serviceKey=${apiKey}`;
    try {
      const response = await axios.get(url);
      setTerms(response.data.data || []);
      setTotalCount(response.data.totalCount || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, [page, perPage]);

  const filteredTerms = query
    ? terms.filter((item) => item.용어.includes(query) || item.설명.includes(query))
    : terms;

  const totalPages = Math.ceil(totalCount / perPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        (i >= page - maxVisiblePages && i <= page + maxVisiblePages)
      ) {
        pageNumbers.push(
          <TouchableOpacity
            key={i}
            style={[
              styles.pageButton,
              page === i && styles.activePageButton,
            ]}
            onPress={() => setPage(i)}
          >
            <Text style={styles.pageButtonText}>{i}</Text>
          </TouchableOpacity>
        );
      } else if (
        (i === page - maxVisiblePages - 1 && i > 1) ||
        (i === page + maxVisiblePages + 1 && i < totalPages)
      ) {
        pageNumbers.push(
          <Text key={`dots-${i}`} style={styles.dots}>
            ...
          </Text>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 검색 입력창 */}
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={query}
        onChangeText={setQuery}
      />
      
      {/* 새로고침 버튼 */}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchTerms}>
        <Text style={styles.refreshButtonText}>
          {loading ? '로딩 중...' : '새로고침'}
        </Text>
      </TouchableOpacity>

      {/* 검색 결과 리스트 */}
      <FlatList
        data={filteredTerms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.용어} subtitle={item.구분} />
            <Card.Content>
              <Text style={styles.text}>분류: {item.분류}</Text>
              <Text style={styles.text}>설명: {item.설명}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.text}>검색 결과가 없습니다.</Text>
          </View>
        }
      />

      {/* 페이지네이션 */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <Text style={styles.arrowButtonText}>{'<'}</Text>
        </TouchableOpacity>

        {renderPageNumbers()}

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <Text style={styles.arrowButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  input: {
    height: 45,
    borderColor: '#B0C4DE',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  refreshButton: {
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: '#63B8E2',
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  empty: {
    alignItems: 'center',
    marginVertical: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#63B8E2',
    backgroundColor: '#FFFFFF',
  },
  activePageButton: {
    backgroundColor: '#B2E1F4',
  },
  pageButtonText: {
    color: '#63B8E2',
    fontWeight: 'bold',
  },
  arrowButton: {
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#63B8E2',
  },
  arrowButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dots: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default DictionaryScreen;
