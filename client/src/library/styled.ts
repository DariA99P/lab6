import styled from "styled-components";
import {Button, Descriptions, Input} from "antd";

export const WrapperComponentStyled = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 930px;
`;
export const BrokersWrapperComponentStyled = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
`;

export const BlockInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 800px;
`;
export const ControlPanelStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  width: 200px;
`;

export const TitleStyled = styled.div`
  font-size: 36px;
`;
export const DescriptionsStyled = styled(Descriptions)`
  tbody {
    tr > td {
      width: 1250px;
    }
  }
`;

export const ButtonBlockStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding: 16px;
`;

export const ButtonStyled = styled(Button)`
  width: 200px;
`;

export const InputItemStyled = styled(Input)`
  width: 400px;
`;

export const StatusBlockStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ActiveButtonStyled = styled(Button)`
  width: 150px;
`;

export const ModalBodyLabelStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const ActionsBlockButton = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginComponentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  justify-content: center;
`;

export const FormBlockStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
`;

export const LineBlockStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const TextStyled = styled.div`
  width: 150px;
`;

export const TitleBlockStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ErrorMessageStyled = styled.div`
  font-size: 14px;
  color: red;
`;

export const DescriptionsBlockStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;