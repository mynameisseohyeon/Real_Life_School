// Style.js
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// yarn add styled-components
// yarn add @types/styled-components @types/styled-components-react-native

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background || "#F0F0F0"};
  align-items: center;
  justify-content: flex-start;
`;

export const Header = styled.View`
  width: 100%;
  padding: 20px;
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const MenuGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 15px;
  justify-content: space-between;
`;

export const MenuItem = styled.TouchableOpacity`
  width: 48%;
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const MenuIcon = styled.View`
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const MenuText = styled.Text`
  font-size: 16px;
  color: #262626;
  font-weight: 500;
`;

export const NewsSection = styled.View`
  padding: 15px;
  width: 100%;
`;

export const NewsCard = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  elevation: 1;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;
`;

export const NewsTitle = styled.Text`
  font-size: 14px;
  color: #262626;
`;

export const ProgressSection = styled.View`
  padding: 15px;
  width: 100%;
`;

export const ProgressTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 10px;
`;

export const ProgressBar = styled.View`
  width: 100%;
  height: 8px;
  background-color: #bfbfbf;
  border-radius: 4px;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    width: ${(props) => props.progress * 100}%;
    height: 100%;
    background-color: #1df2f2;
  }
`;

export const TabBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-top-width: 1px;
  border-top-color: #bfbfbf;
`;

export const TabButton = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.active ? 1 : 0.6)};
`;

export const TabIcon = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CarouselImageContainer = styled.View`
  width: ${width}px;
  height: 200px;
`;

export const CarouselImage = styled.Image`
  width: 100%;
  height: 100%;
`;
