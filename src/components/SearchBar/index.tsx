import React, { useCallback, useState } from "react";
import SearchIcon from "../../shared/Icons/SearchIcon";
import { Mark } from "../../types/MarkDto";
import { RootState } from "../../modules/reducers";
import useComponentVisible from "../../modules/hooks/useComponentVisible";
import {
  IconWrapper,
  KeywordDropdown,
  KeywordItem,
  KeywordsDropdownWrapper,
  KeywordTxt,
  SearchBarContainer,
  SearchBarWrapper,
  SearchIconWrapper,
  SearchInput,
} from "./styles";
import PinIcon from "../../shared/Icons/PinIcon";
import DeleteIcon from "../../shared/Icons/DeleteIcon";
import { useDispatch } from "react-redux";
import { placeAction } from "../../modules/reducers/placeStore";

interface iProps {
  recentKeywords: Array<Mark>;
  setRecentKeywords: (list: any) => void;
}
const SearchBar: React.FC<iProps> = ({ recentKeywords, setRecentKeywords }) => {
  const dispatch = useDispatch();
  const [inputKeyword, setInputKeyword] = useState<string>("");

  const [dropdownRef, showRecentKeywords, setShowRecentKey] =
    useComponentVisible(false);

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setInputKeyword(e.target.value);
    },
    []
  );

  const onHandleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = e.currentTarget.value;
        if (!value) return;
        let list = [...recentKeywords];
        list = list.filter((i) => (!i.placeId && i.name) !== value);
        setRecentKeywords([{ name: value }, ...list]);
        dispatch(placeAction.setKeyword(value));
        setInputKeyword("");
        setShowRecentKey(false);
      }
    },
    [recentKeywords]
  );

  const onHandleClickDeleteBtn = useCallback(
    (key: number) => {
      let list: Array<Mark> = [...recentKeywords];
      list.splice(key, 1);
      setRecentKeywords(list);
    },
    [recentKeywords, setRecentKeywords]
  );

  const onHandleClickInput = useCallback(
    (e: React.MouseEvent) => {
      setShowRecentKey(true);
    },
    [setShowRecentKey]
  );

  return (
    <SearchBarContainer>
      <SearchBarWrapper>
        <SearchIconWrapper>
          <SearchIcon width={20} height={20} stroke={"gray"} />
        </SearchIconWrapper>
        <SearchInput
          id="search_filter"
          className="search-input"
          placeholder={"검색어를 입력하세요."}
          value={inputKeyword}
          onChange={(e) => onChangeKeyword(e)}
          onKeyUp={(e) => onHandleKeyUp(e)}
          onClick={(e) => onHandleClickInput(e)}
          autoComplete="off"
        />
      </SearchBarWrapper>
      {showRecentKeywords && (
        <KeywordsDropdownWrapper ref={dropdownRef}>
          <KeywordDropdown>
            {recentKeywords.map((item: Mark, key: number) => (
              <KeywordItem key={`keyword-item-${key}`}>
                <IconWrapper marginRight={"10px"}>
                  {item?.placeId ? (
                    <PinIcon width={18} height={18} stroke={"gray"} />
                  ) : (
                    <SearchIcon width={18} height={18} stroke={"gray"} />
                  )}
                </IconWrapper>
                <KeywordTxt>{item.name}</KeywordTxt>
                <IconWrapper onClick={() => onHandleClickDeleteBtn(key)}>
                  <DeleteIcon width={18} height={18} stroke={"gray"} />
                </IconWrapper>
              </KeywordItem>
            ))}
          </KeywordDropdown>
        </KeywordsDropdownWrapper>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
