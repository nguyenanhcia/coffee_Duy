import {connect} from 'react-redux'
import {getProductAction} from "./Action";
import Products from "./Products";
const mapStateToProps = (state) => {
    return {
        products: state.productsReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProduct: () => {
            dispatch(getProductAction())
        }
    }
}

const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(Products)
export default ProductsContainer