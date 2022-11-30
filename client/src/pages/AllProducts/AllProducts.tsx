import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminProductCard } from '../../components/AdminProductCard/AdminProductCard';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { InfoMessage } from '../../components/common/InfoMessage/InfoMessage';
import { Preloader } from '../../components/common/Preloader/Preloader';
import { Paginator } from '../../components/Paginator/Paginator';
import { ProductEditForm } from '../../components/ProductEditForm/ProductEditForm';
import { PropertyNamesRow } from '../../components/PropertyNamesRow/PropertyNamesRow';
import { SearchAllProductsForm } from '../../components/SearchAllProductsForm/SearchAllProductsForm';
import { ProductDto } from '../../dtos/products/product.dto';
import { ProductsFilterDto } from '../../dtos/products/productsFilter.dto';
import { ProductsFilterQueryParamsDto } from '../../dtos/products/productsFilterQueryParams.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllComponents } from '../../stateManager/actionCreators/components';
import { getAllProducts } from '../../stateManager/actionCreators/products';
import {
  addToEditingProducts,
  removeFromEditingProducts,
} from '../../stateManager/slices/productsSlice';
import styles from './AllProducts.module.scss';

interface IProps {}

export const AllProducts: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.allProducts);
  const editingProducts = useAppSelector(
    (state) => state.products.editingProducts,
  );
  const isFetchingAllProducts = useAppSelector(
    (state) => state.products.isFetchingAllProducts,
  );
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const pageSize = useAppSelector((state) => state.products.pageSize);
  const filter = useAppSelector((state) => state.products.filter);
  const totalProductsCount = useAppSelector(
    (state) => state.products.totalProductsCount,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const propertiesArray = [
    'id',
    'name',
    'description',
    'category',
    'price',
    'is Active',
  ];

  useEffect(() => {
    dispatch(getAllComponents());
  }, []);

  useEffect(() => {
    const queryParams: ProductsFilterQueryParamsDto = Object.fromEntries([
      ...Array.from(searchParams),
    ]);

    const actualFilter: ProductsFilterDto = {};

    actualFilter.id = queryParams.id;
    actualFilter.name = queryParams.name;
    actualFilter.category = queryParams.category;
    actualFilter.isActive = queryParams.isActive;

    const actualPage: number = Number(queryParams.page)
      ? Number(queryParams.page)
      : currentPage;
    dispatch(getAllProducts(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const queryParamsObj: ProductsFilterQueryParamsDto = {};

    if (filter.id) queryParamsObj.id = filter.id;
    if (filter.name) queryParamsObj.name = filter.name;
    if (filter.category) queryParamsObj.category = filter.category;
    if (filter.isActive) queryParamsObj.isActive = String(filter.isActive);

    queryParamsObj.page = String(currentPage);

    setSearchParams({ ...queryParamsObj });
  }, [filter, currentPage]);

  const renderEditButton = (product: ProductDto) => {
    return editingProducts.some((id) => id === product.id) ? (
      <CustomButton
        startColor='red'
        className={styles.editBtn}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(removeFromEditingProducts(product.id));
        }}
      >
        Cancel
      </CustomButton>
    ) : (
      <CustomButton
        startColor='blue'
        onClick={(e) => dispatch(addToEditingProducts(product.id))}
      >
        Edit
      </CustomButton>
    );
  };

  const renderEditForm = (product: ProductDto) => {
    if (!editingProducts.some((id) => id === product.id)) {
      return null;
    }

    return <ProductEditForm product={product} />;
  };

  const renderCreateButton = () => {
    return isCreatingNewProduct ? (
      <CustomButton
        startColor='red'
        onClick={(e) => setIsCreatingNewProduct(false)}
      >
        Cancel
      </CustomButton>
    ) : (
      <CustomButton
        startColor='green'
        onClick={(e) => setIsCreatingNewProduct(true)}
      >
        Create New
      </CustomButton>
    );
  };

  const renderProductsList = () => {
    if (allProducts.length === 0) {
      return (
        <InfoMessage>No products with these parameters were found</InfoMessage>
      );
    }

    return (
      <>
        {allProducts.map((p) => (
          <AdminProductCard
            key={p.id}
            product={p}
            button={renderEditButton(p)}
            productEditingElement={renderEditForm(p)}
          />
        ))}
      </>
    );
  };

  const onPageChanged = (pageNumber: number) => {
    dispatch(getAllProducts(pageNumber, pageSize, filter));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All products</h2>
      <div className={styles.productsList}>
        {<PropertyNamesRow names={propertiesArray} />}
        {<SearchAllProductsForm />}
        {isFetchingAllProducts && <Preloader />}
        {renderCreateButton()}
        {isCreatingNewProduct && (
          <div className={styles.createBlock}>
            <ProductEditForm setIsCreating={setIsCreatingNewProduct} />
          </div>
        )}
        {renderProductsList()}
        <Paginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          pageSize={pageSize}
          totalItemsCount={totalProductsCount}
        />
      </div>
    </div>
  );
};
