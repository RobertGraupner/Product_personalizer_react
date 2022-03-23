import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductImage from './ProductImage/ProductImage';
import ProductForm from './ProductForm/ProductForm';

const Product = props => {
	const data = props.data;

	const [currentColor, setCurrentColor] = useState(data.colors[0]);
	const [currentSize, setCurrentSize] = useState(data.sizes[0].name);

	const prepareColorClassName = color => {
		return styles[
			"color" + color[0].toUpperCase() + color.substr(1).toLowerCase()
		];
	};

	const getPrice = () => {
		const choosedSize = data.sizes.find( element => element.name === currentSize);
		return data.basePrice + choosedSize.additionalPrice
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Summary");
		console.log("========");
		console.log("Name:", data.title);
		console.log("Price:", getPrice());
		console.log("Size:", currentSize);
		console.log("Color:", currentColor);
	};

	return (
		<article className={styles.product}>
			<ProductImage title={data.title} name={data.name} currentColor={currentColor}/>
			<div>
				<header>
					<h2 className={styles.name}>{data.title}</h2>
					<span className={styles.price}>Price: {getPrice()}$</span>
				</header>
				<ProductForm
					data={data}
					handleSubmit={handleSubmit}
					currentSize={currentSize}
					setCurrentSize={setCurrentSize}
					currentColor={currentColor}
					setCurrentColor={setCurrentColor}
					prepareColorClassName={prepareColorClassName}
					getPrice={getPrice()}
				/>
			</div>
		</article>
	);

	/*
	return (
		<article className={styles.product}>
			<div className={styles.imageContainer}>
				<img className={styles.image} alt={data.title} src={`${process.env.PUBLIC_URL}/images/products/shirt-${data.name}--${currentColor}.jpg`} />
			</div>
			<div>
				<header>
					<h2 className={styles.name}>{data.title}</h2>
					<span className={styles.price}>Price: {getPrice()}$</span>
				</header>
				<form onSubmit={handleSubmit}>
					<div className={styles.sizes}>
						<h3 className={styles.optionLabel}>Sizes</h3>
						<ul className={styles.choices}>
							{data.sizes.map((size) => (
								<li key={size.name}>
									<button type="button" className={clsx(size.name === currentSize && styles.active)} onClick={() => setCurrentSize(size.name)}>{size.name}</button>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.colors}>
						<h3 className={styles.optionLabel}>Colors</h3>
						<ul className={styles.choices}>
							{data.colors.map((color) => (
								<li key={color}>
									<button type="button" className={clsx(prepareColorClassName(color),currentColor === color && styles.active)} onClick={() => setCurrentColor(color)}/>
								</li>
							))}
						</ul>
					</div>
					<Button className={styles.button}>
						<span className="fa fa-shopping-cart" />
					</Button>
				</form>
			</div>
		</article>
	);
	*/
};

Product.propTypes = {
  data:PropTypes.object
};

export default Product;