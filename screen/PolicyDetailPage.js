import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Linking } from 'react-native';
import { XMLParser } from 'fast-xml-parser'; // yarn add fast-xml-parser
import Constants from 'expo-constants';

const PolicyDetailPage = ({ route }) => {
  const { policyId } = route.params; 
  const [policyDetail, setPolicyDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const openApiVlak = Constants.expoConfig.extra.openApiVlak; 
  const display = 1;
  const pageIndex = 1; 

  useEffect(() => {
    const fetchPolicyDetail = async () => {
      try {
        const url = `https://www.youthcenter.go.kr/opi/youthPlcyList.do?openApiVlak=${openApiVlak}&display=${display}&pageIndex=${pageIndex}&srchPolicyId=${policyId}`;

        const response = await fetch(url);
        const xmlString = await response.text();
        const parser = new XMLParser();
        const result = parser.parse(xmlString);


        // 응답 데이터가 있는지 확인하고 처리
        if (result.youthPolicyList && result.youthPolicyList.youthPolicy) {
          const policies = Array.isArray(result.youthPolicyList.youthPolicy) ? result.youthPolicyList.youthPolicy : [result.youthPolicyList.youthPolicy];
          
          const policyData = policies.find(policy => policy.bizId === policyId);
          if (policyData) {
            setPolicyDetail(policyData);
          } else {
            console.log("Policy ID mismatch or policy not found.");
          }
        } else {
          console.log("No details found for this policy.");
        }
      } catch (error) {
        console.error('Error fetching policy details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyDetail();
  }, [policyId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!policyDetail) {
    return (
      <View style={styles.container}>
        <Text>No details found for this policy.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{policyDetail.polyBizSjnm}</Text>
      <Text style={styles.subtitle}>{policyDetail.polyItcnCn}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>지원 내용</Text>
        <Text>{policyDetail.sporCn}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>지원 규모</Text>
        <Text>{policyDetail.sporScvl || '정보 없음'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사업 운영 기간</Text>
        <Text>{policyDetail.bizPrdCn || '정보 없음'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>연령 정보</Text>
        <Text>{policyDetail.ageInfo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>학력 요건</Text>
        <Text>{policyDetail.accrRqisCn}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>취업 상태</Text>
        <Text>{policyDetail.empmSttsCn}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>거주지 및 소득 조건</Text>
        <Text>{policyDetail.prcpCn}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>신청 절차</Text>
        <Text>{policyDetail.rqutProcCn}</Text>
      </View>

      {policyDetail.rqutUrla && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>신청 사이트</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(policyDetail.rqutUrla)}>
            {policyDetail.rqutUrla}
          </Text>
        </View>
      )}

      {policyDetail.rfcSiteUrla1 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>참고 사이트 1</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(policyDetail.rfcSiteUrla1)}>
            {policyDetail.rfcSiteUrla1}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PolicyDetailPage;
