import React, { useCallback, useState } from "react";
import SearchIcon from "../../shared/Icons/SearchIcon";
import styled from "@emotion/styled";
import useLocalStorage from "../../modules/hooks/useLocalStorage";
import { LOCAL_STORAGE_RECENT_KEYWORDS } from "../../shared/utils/storageKey";
import useComponentVisible from "../../modules/hooks/useComponentVisible";

const SearchBarContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

const SearchBarWrapper = styled.div`
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

const SearchIconWrapper = styled.div``;

const SearchInput = styled.input`
  margin-left: 10px;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none !important;
  }
`;

const KeywordsDropdownWrapper = styled.div`
  top: 0;
  margin-top: 10px;
`;

const KeywordDropdown = styled.div`
  padding-top: 16px;
  padding-bottom: 12px;
  min-height: 100px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 1px 3px rgb(117 83 196 / 10%), 0 0 30px rgb(117 83 196 / 10%);
  background-color: #fff;
`;

const KeywordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [dropdownRef, showRecentKeywords, setShowRecentKey] =
    useComponentVisible(false);
  const [recentKeywords, setRecentKeywords] = useLocalStorage(
    LOCAL_STORAGE_RECENT_KEYWORDS,
    []
  );

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setKeyword(e.target.value);
    },
    []
  );

  const onHandleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = e.currentTarget.value;
        if (!value) return;
        let list = [...recentKeywords];
        const i = recentKeywords.indexOf(value);
        if (i > -1) {
          list.splice(i, 1);
        }

        setRecentKeywords([value, ...list]);
        setKeyword("");
      }
    },
    [recentKeywords, setRecentKeywords]
  );

  const onHandleClick = useCallback(
    (e: React.MouseEvent) => {
      setShowRecentKey(true);
    },
    [setShowRecentKey]
  );

  return (
    <SearchBarContainer>
      <SearchBarWrapper>
        <SearchIconWrapper>
          <SearchIcon
            width={20}
            height={20}
            stroke={"gray"}
            classes="home-searchmenu--search"
          />
        </SearchIconWrapper>
        <SearchInput
          id="search_filter"
          className="search-input"
          placeholder={"검색어를 입력하세요."}
          value={keyword}
          onChange={(e) => onChangeKeyword(e)}
          onKeyUp={(e) => onHandleKeyUp(e)}
          onClick={(e) => onHandleClick(e)}
          autoComplete="off"
        />
      </SearchBarWrapper>
      {showRecentKeywords && (
        <KeywordsDropdownWrapper ref={dropdownRef}>
          <KeywordDropdown>
            {recentKeywords.map((item: string, key: number) => (
              <KeywordItem key={`keyword-item-${key}`}>{item}</KeywordItem>
            ))}
          </KeywordDropdown>
        </KeywordsDropdownWrapper>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
