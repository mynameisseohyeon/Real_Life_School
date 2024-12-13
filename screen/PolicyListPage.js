import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { XMLParser } from "fast-xml-parser";
// import { OPEN_API_VLAK } from "@env";

const PolicyListPage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const openApiVlak = "6575be77c522532b6165f0ec"; // 인증키, 나중에 env로
  const display = 10; // 페이지당 출력 건수

  const regions = [
    { label: "서울", value: "003002001" },
    { label: "부산", value: "003002002" },
    { label: "대구", value: "003002003" },
    { label: "모든 지역", value: "" },
  ];

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(
          `https://www.youthcenter.go.kr/opi/youthPlcyList.do?openApiVlak=${openApiVlak}&display=${display}&pageIndex=${pageIndex}&srchPolyBizSecd=${selectedRegion}`
        );
        const xmlString = await response.text();
        const parser = new XMLParser();
        const result = parser.parse(xmlString);

        if (result.youthPolicyList && result.youthPolicyList.youthPolicy) {
          setData(result.youthPolicyList.youthPolicy);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [pageIndex, selectedRegion]);

  useEffect(() => {
    // 검색 기능: 검색어에 맞는 정책 필터링
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.polyBizSjnm.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, data]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const handlePress = (policyId) => {
    navigation.navigate("PolicyDetailPage", { policyId });
  };

  const handlePageChange = (direction) => {
    setPageIndex((prevPage) => {
      const newPage = prevPage + direction;
      return newPage > 0 ? newPage : 1; // 페이지 번호가 1 이하로 내려가지 않도록 처리
    });
  };

  const renderRegionModal = () => (
    <Modal
      transparent={true}
      visible={regionModalVisible}
      animationType="slide"
      onRequestClose={() => setRegionModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Region</Text>
          <FlatList
            data={regions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedRegion(item.value);
                  setRegionModalVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  // 페이지 숫자 표시 (현재 페이지, 앞뒤 두 페이지)
  const renderPagination = () => {
    const pages = [];
    for (let i = pageIndex - 2; i <= pageIndex + 2; i++) {
      if (i > 0) {
        pages.push(i);
      }
    }

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => handlePageChange(-1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageText}>Previous</Text>
        </TouchableOpacity>

        <View style={styles.pageNumbers}>
          {pages.map((pageNum) => (
            <TouchableOpacity
              key={pageNum}
              onPress={() => setPageIndex(pageNum)}
              style={[
                styles.pageNumberButton,
                pageNum === pageIndex && styles.activePageNumberButton,
              ]}
            >
              <Text style={styles.pageNumberText}>{pageNum}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => handlePageChange(1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 검색 바 */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by policy title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* 지역 선택 버튼 */}
      <Button title="지역 선택" onPress={() => setRegionModalVisible(true)} />

      {/* 정책 목록 */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.bizId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item.bizId)}
            style={styles.card}
          >
            <Text style={styles.title}>{item.polyBizSjnm}</Text>
            <Text style={styles.description}>{item.polyItcnCn}</Text>
          </TouchableOpacity>
        )}
      />

      {/* 페이지 네비게이션 */}
      {renderPagination()}

      {/* 지역 선택 모달 */}
      {renderRegionModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 16,
    width: "100%",
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 16,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
    alignItems: "center",
  },
  pageButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  pageText: {
    fontSize: 16,
    color: "#007BFF",
  },
  pageNumbers: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageNumberButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  activePageNumberButton: {
    backgroundColor: "#007BFF",
  },
  pageNumberText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default PolicyListPage;
