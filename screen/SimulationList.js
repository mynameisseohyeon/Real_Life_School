import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Images from "../assets/images/Simulation";
import { DetailListView, NewsCard, NewsTitle } from "../components/Style";

export default function SimulationList({ navigation }) {
  const simulations = [
    {
      id: 1,
      title: "임대 계약 시 보증금 반환 문제",
      image: Images["001"],
      category: "주택법",
      scenarioDescription:
        "새로운 원룸을 임대하기 위해 부동산 중개사를 통해 집주인과 만났습니다. 계약 조건은 보증금 1,000만 원, 월세 50만 원, 계약 기간 2년입니다. 계약 후 몇 달 뒤 집주인이 보증금을 돌려줄 수 없다고 통보해왔으며, 그 이유는 집에 누수가 발생하여 수리 비용이 필요하고 이전 세입자가 파손한 물건이 있기 때문입니다.",
      scenario: "새로운 원룸 임대 계약에서 보증금 반환 문제",
      choices: [
        "보증금에서 수리 비용을 차감하고 나머지 금액을 돌려받기",
        "수리 비용을 지불하고 보증금 전액을 돌려받기",
        "계약을 해지하고 다른 집을 찾기",
      ],
      consequences: [
        "보증금에서 수리 비용 차감으로 남은 금액 부족",
        "예상치 못한 수리 비용 지출로 자금 상황 악화",
        "계약 해지 과정에서 위약금이나 추가 비용 발생 가능",
      ],
      keyLearnings: [
        "누수 문제 발생 시 즉시 집주인에게 알리고 수리 요청",
        "이전 세입자 파손 문제는 집주인과 협의하여 해결",
        "보증금 반환 문제 시 법적 조치 가능",
      ],
    },
    {
      id: 2,
      title: "노동법: 근로 계약서 미작성 대응",
      image: Images["002"],
      category: "노동법",
      scenarioDescription:
        "A 회사에 입사하여 3개월간 근무하였으나, 회사는 근로 계약서를 작성하지 않았습니다. 어느 날 회사는 갑작스럽게 급여를 삭감한다고 통보했고, 이에 대해 불만을 느꼈습니다. 회사 측은 자금 사정이 좋지 않아 급여 조정이 불가피하다고 주장합니다.",
      scenario: "근로 계약서 미작성 회사에서의 급여 삭감 상황",
      choices: ["회사에 근로 계약서 작성 요청", "노동청에 신고", "퇴사"],
      consequences: [
        "회사의 계약서 작성 여부에 따라 문제 해결 가능성",
        "노동청 조사 후 회사에 벌금 부과 가능성",
        "퇴사 후에도 법적 대응 가능",
      ],
      keyLearnings: [
        "근로 계약서는 근로자의 권리와 의무를 명시하는 중요 문서",
        "법적 조치를 통해 근로자 권리 보호 가능",
        "노동청 신고나 소송을 통한 문제 해결 방법",
      ],
    },
    {
      id: 3,
      title: "금융법: 대출 상환 연체 대응",
      image: Images["003"],
      category: "금융법",
      scenarioDescription:
        "B 은행에서 1,000만 원을 대출받았으며, 대출 상환일은 매월 10일입니다. 이번 달에는 자금 사정이 좋지 않아 상환하지 못했습니다. 은행에서 연체에 대한 통보를 받았고, 이로 인해 심각한 financial 위기에 직면했습니다.",
      scenario: "대출 상환일 미납으로 인한 financial 위기",
      choices: ["은행에 상환 유예 요청", "대출 상환 연체", "대출금 전액 상환"],
      consequences: [
        "은행의 상환 유예 승인 여부에 따른 결과",
        "신용등급 하락 및 연체 이자 부과",
        "갑작스러운 전액 상환으로 자금 상황 악화 가능성",
      ],
      keyLearnings: [
        "대출 상환일 엄수의 중요성",
        "연체 시 신용등급 하락 위험",
        "은행과 협의하여 분할 상환 등 대안 모색 가능",
      ],
    },
    {
      id: 4,
      title: "부동산 계약: 곰팡이 문제 대응",
      image: Images["004"],
      category: "부동산법",
      scenarioDescription:
        "새로 이사할 집을 찾던 중 벽에 곰팡이가 핀 것을 발견하고, 집주인과 논의하게 됩니다.",
      scenario: "집 계약 시 발견된 곰팡이 문제",
      choices: [
        "집주인에게 곰팡이 제거 및 보수 요청",
        "계약 취소하고 다른 집 알아보기",
        "곰팡이 문제 감수하고 계약 진행",
      ],
      consequences: [
        "집주인의 곰팡이 제거 및 보수 여부",
        "계약 취소로 인한 시간과 노력 소요",
        "건강과 안전에 대한 우려",
      ],
      keyLearnings: [
        "계약 전 부동산 상태 철저히 확인",
        "문제 발견 시 집주인과 협의",
        "필요시 법적 조치 고려",
      ],
    },
    {
      id: 5,
      title: "부동산 사기: 전세 계약 피해 대응",
      image: Images["005"],
      category: "부동산법",
      scenarioDescription:
        "전세 계약 체결 후 부동산 중개사와 집주인이 연락 두절되고, 이미 5,000만 원의 계약금을 지불한 상태입니다.",
      scenario: "전세 사기 피해 대응 방법",
      choices: [
        "경찰에 신고하기",
        "금융 기관에 연락하기",
        "변호사와 상담하기",
        "주택도시 보증 공사(HUG)에 연락하기",
        "대한법률구조공단에 연락하기",
        "주택 임대차 분쟁 조정 위원회에 조정 신청하기",
      ],
      consequences: [
        "사기범 추적 및 법적 대응",
        "계좌 지급 정지 가능성",
        "피해 보상을 위한 민사 소송",
        "임시 거처 및 법률 지원",
      ],
      keyLearnings: [
        "부동산 중개사 신뢰성 검증",
        "계약 전 등기부등본 확인",
        "사기 의심 시 즉시 대응",
      ],
    },
    {
      id: 6,
      title: "부동산 계약: 주택 계약 필수 확인 사항",
      image: Images["006"],
      category: "부동산법",
      scenarioDescription:
        "부동산 중개사를 통해 마음에 드는 집을 발견하고 계약을 진행하려고 합니다.",
      scenario: "주택 계약 시 필수 확인 사항",
      choices: [
        "등기부등본 확인하기",
        "실소유자 확인하기",
        "채권 최고액 확인하기",
        "보증보험 가입 여부 확인하기",
        "전입신고 및 확정일자 받기",
      ],
      consequences: [
        "부동산의 권리관계 파악",
        "실소유자 신분 확인",
        "대출금 규모 파악",
        "전세금 보호",
        "우선변제권 확보",
      ],
      keyLearnings: [
        "등기부등본을 통한 권리관계 확인",
        "실소유자 직접 확인",
        "보증보험 가입 중요성",
        "우선변제권의 의미",
      ],
    },
    {
      id: 7,
      title: "보험법: 보험금 미지급 대응",
      image: Images["007"],
      category: "보험법",
      scenarioDescription:
        "건강보험 상품 가입 후 사고로 입원했으나, 보험사가 보험금 지급을 거부했습니다.",
      scenario: "보험 상품 가입 후 보험금 미지급 대응",
      choices: [
        "보험사에 항의하기",
        "금융감독원에 민원 제기하기",
        "변호사와 상담하기",
      ],
      consequences: [
        "보험사 재심사 가능성",
        "금융감독원 조사 및 제재",
        "법적 조치를 통한 보험금 청구",
      ],
      keyLearnings: [
        "고지의무 철저히 이행",
        "약관 꼼꼼히 확인",
        "보험 사기 예방",
      ],
    },
    {
      id: 8,
      title: "노동법: 부당 해고 대응",
      image: Images["008"],
      category: "노동법",
      scenarioDescription: "B 회사에서 경영상의 이유로 해고 통보를 받았습니다.",
      scenario: "부당 해고에 대한 대응 방법",
      choices: [
        "노동위원회에 구제 신청하기",
        "민사 소송 제기하기",
        "노동부에 신고하기",
      ],
      consequences: [
        "노동위원회 심사 및 조치",
        "법원 판결을 통한 해결",
        "근로 감독관의 조사 및 제재",
      ],
      keyLearnings: [
        "부당 해고 시 신속한 대응",
        "필요 증빙 자료 준비",
        "법적 구제 절차 이해",
      ],
    },
    {
      id: 9,
      title: "금융법: 대출 상환 연체 대응",
      image: Images["009"],
      category: "금융법",
      scenarioDescription:
        "B 은행에서 1,000만 원을 대출받았으며, 대출 상환일은 매월 10일입니다. 이번 달에는 자금 사정이 좋지 않아 상환하지 못했습니다.",
      scenario: "대출 상환일 미납으로 인한 financial 위기",
      choices: ["은행에 상환 유예 요청", "대출 상환 연체", "대출금 전액 상환"],
      consequences: [
        "은행의 상환 유예 승인 여부에 따른 결과",
        "신용등급 하락 및 연체 이자 부과",
        "갑작스러운 전액 상환으로 자금 상황 악화 가능성",
      ],
      keyLearnings: [
        "대출 상환일 엄수의 중요성",
        "연체 시 신용등급 하락 위험",
        "은행과 협의하여 분할 상환 등 대안 모색 가능",
      ],
    },
  ];

  const handleSimulationListPress = (item) => {
    console.log("Selected Item:", item);

    if (navigation && item) {
      navigation.navigate("Simulation", {
        selectedItem: item,
      });
    }
  };

  return (
    <ScrollView style={{ width: "100%" }} keyboardShouldPersistTaps="handled">
      <DetailListView>
        {simulations.map((item) => (
          <NewsCard
            key={item.id}
            onPress={() => handleSimulationListPress(item)}
          >
            {item.image && (
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image } // URL인 경우
                    : item.image // 로컬 파일인 경우
                }
                style={{
                  width: "100%",
                  height: 200,
                  marginBottom: 10,
                }}
                resizeMode="cover"
              />
            )}
            <NewsTitle>{item.title}</NewsTitle>
          </NewsCard>
        ))}
      </DetailListView>
    </ScrollView>
  );
}
