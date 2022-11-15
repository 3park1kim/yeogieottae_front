import styled from "@emotion/styled";

export const SearchBarContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 95%;
  height: 40px;
  font-size: 15px;
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  padding: 0 10px;
  margin-top: 20px;
`;

export const SearchIconWrapper = styled.div``;

export const SearchInput = styled.input`
  margin-left: 10px;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none !important;
  }
`;

export const KeywordsDropdownWrapper = styled.div`
  top: 0;
  margin-top: 10px;
`;

export const KeywordDropdown = styled.div`
  padding-top: 16px;
  padding-bottom: 12px;
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 1px 3px rgb(117 83 196 / 10%), 0 0 30px rgb(117 83 196 / 10%);
  background-color: #fff;
`;

export const KeywordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  &:hover {
    background-color: #f2f2f2;

    div:last-child {
      display: flex;
      cursor: pointer;
    }
  }
`;

export const IconWrapper = styled.div<{
  marginRight?: string;
}>`
  display: flex;
  align-item: center;
  justify-content: center;

  margin-right: ${({ marginRight }) => marginRight};

  &:last-child {
    display: none;
  }
`;

export const KeywordTxt = styled.span`
  margin-right: auto;
`;
