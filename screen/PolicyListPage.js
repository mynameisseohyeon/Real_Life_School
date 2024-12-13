import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import Constants from 'expo-constants';

const PolicyListPage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const openApiVlak = Constants.expoConfig.extra.openApiVlak; 
  const display = 10; // 페이지당 출력 건수

  const regions = [
    { label: '서울', value: '003002001' },
    { label: '부산', value: '003002002' },
    { label: '대구', value: '003002003' },
    { label: '인천', value: '003002004' },
    { label: '광주', value: '003002005' },
    { label: '대전', value: '003002006' },
    { label: '울산', value: '003002007' },
    { label: '경기', value: '003002008' },
    { label: '강원', value: '003002009' },
    { label: '충북', value: '003002010' },
    { label: '충남', value: '003002011' },
    { label: '전북', value: '003002012' },
    { label: '전남', value: '003002013' },
    { label: '경북', value: '003002014' },
    { label: '경남', value: '003002015' },
    { label: '제주', value: '003002016' },
    { label: '모든 지역', value: '' },
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
    if (searchQuery === '') {
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
    navigation.navigate('PolicyDetailPage', { policyId });
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
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => setRegionModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>지역 선택</Text>
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
      </TouchableOpacity>
    </Modal>
  );

  const renderPagination = () => {
    const pages = [];
    for (let i = pageIndex - 2; i <= pageIndex + 2; i++) {
      if (i > 0) {
        pages.push(i);
      }
    }

    return (
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => handlePageChange(-1)} style={styles.pageButton}>
          <Text style={styles.pageText}>{'<'}</Text>
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

        <TouchableOpacity onPress={() => handlePageChange(1)} style={styles.pageButton}>
          <Text style={styles.pageText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 검색 바와 지역 선택 버튼 */}
      <View style={styles.searchAndRegionContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="제목을 검색하세요..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.regionButton}
          onPress={() => setRegionModalVisible(true)}
        >
          <Text style={styles.regionButtonText}>
            {selectedRegion
              ? regions.find((r) => r.value === selectedRegion)?.label || '지역 선택'
              : '지역 선택'}
          </Text>
        </TouchableOpacity>
      </View>

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
            <Text style={styles.footer}>{`지원 자격: ${item.ageInfo || '미정'}`}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  searchAndRegionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  regionButton: {
    backgroundColor: '#63B8E2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  regionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
  },
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#63B8E2',
    borderRadius: 4,
  },
  pageText: {
    color: '#fff',
    fontSize: 14,
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumberButton: {
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  activePageNumberButton: {
    backgroundColor: '#63B8E2',
  },
  pageNumberText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default PolicyListPage;
