/**
 * @file DOMに対する汎用的な処理要求に応じるメソッド群
 *

 /**
 * セレクタから取得した複数のテキストを配列に格納して返す
 * @param element
 * @param selectors
 * @returns {Array}
 */
export const getTexts = ({ element = document, selectors }) => {
  const texts = element.querySelectorAll(selectors);
  const tempTexts = [];

  Array.prototype.forEach.call(texts, text => {
    tempTexts.push(text.innerText.trim());
  });

  return tempTexts;
};
