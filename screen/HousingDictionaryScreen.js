import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, Card } from "react-native-paper"; //yarn add react-native-paper
import axios from "axios"; //yarn add axios
import getEnvVars from "../enviroments";
const { ODCLOUD_API_KEY } = getEnvVars();

const HousingDictionaryScreen = () => {
  const [page, setPage] = useState(1); // 현재 페이지
  const [perPage, setPerPage] = useState(10); // 한 페이지당 항목 수
  const [terms, setTerms] = useState([]); // 주택 용어 데이터
  const [totalCount, setTotalCount] = useState(0); // 전체 데이터 개수
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [query, setQuery] = useState(""); // 검색어 상태

  const fetchTerms = async () => {
    setLoading(true);
    const url = `https://api.odcloud.kr/api/3071592/v1/uddi:3ce75abb-784f-499f-9c3c-8c56de47535d?page=${page}&perPage=${perPage}&returnType=JSON&serviceKey=${ODCLOUD_API_KEY}`;
    try {
      const response = await axios.get(url);
      setTerms(response.data.data || []);
      setTotalCount(response.data.totalCount || 0); // 전체 데이터 개수 업데이트
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
    ? terms.filter(
        (item) =>
          item.주택금융용어.includes(query) || item.용어설명.includes(query)
      )
    : terms;

  const totalPages = Math.ceil(totalCount / perPage); // 전체 페이지 수 계산

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        //i === 1 ||
        //i === totalPages ||
        i >= page - maxVisiblePages &&
        i <= page + maxVisiblePages
      ) {
        pageNumbers.push(
          <TouchableOpacity
            key={i}
            style={[styles.pageButton, page === i && styles.activePageButton]}
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
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={query}
        onChangeText={setQuery}
      />
      <Button mode="contained" onPress={fetchTerms} style={styles.button}>
        {loading ? "로딩 중..." : "새로고침"}
      </Button>

      <FlatList
        data={filteredTerms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.주택금융용어} //subtitle={`순번: ${item.순번}`}
            />
            <Card.Content>
              <Text>설명: {item.용어설명}</Text>
              <Text>대표 사용례: {item["대표 사용례"] || "없음"}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>검색 결과가 없습니다.</Text>
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
          <Text style={styles.arrowButtonText}>{"<"}</Text>
        </TouchableOpacity>

        {renderPageNumbers()}

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <Text style={styles.arrowButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  button: {
    marginBottom: 16,
  },
  card: {
    marginVertical: 8,
    padding: 16,
  },
  empty: {
    alignItems: "center",
    marginVertical: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  pageButton: {
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#fff",
  },
  activePageButton: {
    backgroundColor: "#007BFF",
  },
  pageButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  arrowButton: {
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#007BFF",
  },
  arrowButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dots: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
});

export default HousingDictionaryScreen;
