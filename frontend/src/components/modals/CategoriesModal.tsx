import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import {Category} from "../../utils/types";
import {defaultCategories} from "../../utils/mocks";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  border-radius: 16px;
  width: 320px;
  height: 580px;
  background: #3a7ca5;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BackButton = styled.button`
  padding: 11px 8px;
  width: 81px;
  height: 44px;
  background: none;
  border: none;
  font-family: "SF Pro", sans-serif;
  font-weight: 590;
  font-size: 17px;
  line-height: 129%;
  color: #1b1d1f;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: -0.02em;
  margin-left: 12px;
`;

const CategoriesContainer = styled.div`
  border: 2px solid #5fa8d3;
  border-radius: 16px;
  width: 280px;
  height: 480px;
  background: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryItem = styled.div`
  width: 240px;
  min-height: 78px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid #5fa8d3;
  border-radius: 12px;
  background-color: #f9f9f9;
`;

const CategoryName = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 229%;
  letter-spacing: 0.04em;
  text-align: center;
  color: #000;
`;

const CategoryOptions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 11px;
  line-height: 218%;
  letter-spacing: 0.05em;
  color: #1b1d1f;
`;

const Checkbox = styled.div<{ checked?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #5fa8d3;
  background: ${props => props.checked ? '#5fa8d3' : '#fff'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const DeleteButton = styled.button`
  border-radius: 8px;
  padding: 12px 12px;
  width: 72px;
  height: 24px;
  background: #5fa8d3;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 5%;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;

const CategoryLabel = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 145%;
  letter-spacing: 0.05em;
  color: #000;
`;

const NewCategoryForm = styled.div`
  width: 240px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 2px solid #5fa8d3;
  border-radius: 12px;
`;

const NewCategoryLabel = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 11px;
  line-height: 145%;
  letter-spacing: 0.05em;
  color: #000;
`;

const NewCategoryInput = styled.input`
  border: 1px solid #3a7ca5;
  border-radius: 8px;
  width: 140px;
  height: 24px;
  background: #fff;
  padding: 8px;
  font-family: "Montserrat", sans-serif;
  font-size: 11px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #5fa8d3;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 129%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CategoriesModal: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>({
    name: '',
    isIncome: false,
    isExpense: false,
    hasTax: false,
  });

  const handleBack = () => {
    navigate('/settings');
  };

  const handleDelete = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (newCategory.name && (newCategory.isIncome || newCategory.isExpense)) {
      setCategories([...categories, newCategory]);
      setNewCategory({
        name: '',
        isIncome: false,
        isExpense: false,
        hasTax: false,
      });
      setIsAddingNew(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <BackButton onClick={handleBack}>
          ← Назад
        </BackButton>
        <CategoriesContainer>
          <ActionButtons>
            <CategoryLabel>Категорії</CategoryLabel>
            <ActionButton onClick={() => setIsAddingNew(true)}>+</ActionButton>
            <ActionButton onClick={handleAdd}>✓</ActionButton>
            <ActionButton onClick={() => setIsAddingNew(false)}>❌</ActionButton>
          </ActionButtons>
          <CategoryList>
            {isAddingNew && (
              <NewCategoryForm>
                <NewCategoryLabel>Введіть назву категорії</NewCategoryLabel>
                <NewCategoryInput
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <CategoryOptions>
                  <CheckboxContainer>
                    <Checkbox
                      checked={newCategory.isIncome}
                      onClick={() => setNewCategory({ ...newCategory, isIncome: !newCategory.isIncome, isExpense: false })}
                    >
                      {newCategory.isIncome && '✓'}
                    </Checkbox>
                    <CheckboxLabel>Дохід</CheckboxLabel>
                  </CheckboxContainer>

                  <CheckboxContainer>
                    <Checkbox
                      checked={newCategory.isExpense}
                      onClick={() => setNewCategory({ ...newCategory, isExpense: !newCategory.isExpense, isIncome: false })}
                    >
                      {newCategory.isExpense && '✓'}
                    </Checkbox>
                    <CheckboxLabel>Витрати</CheckboxLabel>
                  </CheckboxContainer>

                  {newCategory.isIncome && (
                    <CheckboxContainer>
                      <Checkbox
                        checked={newCategory.hasTax}
                        onClick={() => setNewCategory({ ...newCategory, hasTax: !newCategory.hasTax })}
                      >
                        {newCategory.hasTax && '✓'}
                      </Checkbox>
                      <CheckboxLabel>Податок</CheckboxLabel>
                    </CheckboxContainer>
                  )}
                </CategoryOptions>
              </NewCategoryForm>
            )}
            {categories.map((category, index) => (
              <CategoryItem key={index}>
                <CategoryName>{category.name}</CategoryName>
                <CategoryOptions>
                  <CheckboxContainer>
                    <Checkbox checked={category.isIncome}>
                      {category.isIncome && '✓'}
                    </Checkbox>
                    <CheckboxLabel>Дохід</CheckboxLabel>
                  </CheckboxContainer>
                  <CheckboxContainer>
                    <Checkbox checked={category.isExpense}>
                      {category.isExpense && '✓'}
                    </Checkbox>
                    <CheckboxLabel>Витрати</CheckboxLabel>
                  </CheckboxContainer>
                  {category.isIncome && (
                    <CheckboxContainer>
                      <Checkbox checked={category.hasTax}>
                        {category.hasTax && '✓'}
                      </Checkbox>
                      <CheckboxLabel>Податок</CheckboxLabel>
                    </CheckboxContainer>
                  )}
                </CategoryOptions>
                <DeleteButton onClick={() => handleDelete(index)}>
                  Видалити
                </DeleteButton>
              </CategoryItem>
            ))}
          </CategoryList>
        </CategoriesContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CategoriesModal; 