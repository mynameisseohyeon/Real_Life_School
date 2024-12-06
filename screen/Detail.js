import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import Images from "../assets/images/Housing";

export default function Detail({ route }) {
  // 안전한 데이터 추출
  const { selectedItem } = route.params || {};

  const handleOpenURL = async () => {
    // 링크 열기 핸들러
    if (selectedItem.url) {
      try {
        const supported = await Linking.canOpenURL(selectedItem.url);
        if (supported) {
          await Linking.openURL(selectedItem.url);
        } else {
          console.log("해당 URL을 열 수 없습니다.");
        }
      } catch (error) {
        console.error("URL 열기 중 오류 발생:", error);
      }
    }
  };

  if (!selectedItem) {
    // 아이템이 없을 경우 처리
    return (
      <ScrollView style={{ width: "100%" }}>
        <Text>선택된 항목이 없습니다.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ width: "100%", padding: 10 }}>
      {/* 제목 */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {selectedItem.title}
      </Text>

      {/* 이미지 */}
      {selectedItem.image ? (
        <Image
          source={
            typeof selectedItem.image === "string"
              ? { uri: selectedItem.image } // URL인 경우
              : selectedItem.image // 로컬 파일인 경우
          }
          style={{
            width: "100%",
            height: 200,
            marginBottom: 10,
          }}
          resizeMode="cover"
        />
      ) : (
        <Text style={{ color: "gray", marginBottom: 10 }}>
          이미지를 사용할 수 없습니다.
        </Text>
      )}

      {/* 내용 */}
      <Text
        style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 10,
        }}
      >
        {selectedItem.content}
      </Text>

      {/* 원본 링크 버튼 */}
      {selectedItem.url && (
        <TouchableOpacity
          onPress={handleOpenURL}
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            원본 기사 보기
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
