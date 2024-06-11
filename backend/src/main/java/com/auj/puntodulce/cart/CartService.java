package com.auj.puntodulce.cart;

import com.auj.puntodulce.exception.CartNotFoundException;
import com.auj.puntodulce.exception.InvalidCartException;
import com.auj.puntodulce.exception.ProductNotFound;
import com.auj.puntodulce.order.CheckoutRequest;
import com.auj.puntodulce.order.OrderDataAccessService;
import com.auj.puntodulce.product.Product;
import com.auj.puntodulce.product.ProductDataAccessService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
public class CartService {
    private final CartDataAccessService cartDataAccessService;
    private final ProductDataAccessService productDataAccessService;
    private final CartDTOMapper cartDTOMapper;

    public CartService(CartDataAccessService cartDataAccessService, ProductDataAccessService productDataAccessService, CartDTOMapper cartDTOMapper) {
        this.cartDataAccessService = cartDataAccessService;
        this.productDataAccessService = productDataAccessService;
        this.cartDTOMapper = cartDTOMapper;
    }


    public CartResponse addItemToCart(UUID cartID, UUID productId, int quantity){
        Cart cart = cartDataAccessService.findCartByIdOrCreate(cartID);
        Product product = productDataAccessService.selectProductById(productId)
                .orElseThrow(() -> new ProductNotFound("Product not found"));
        cart.addOrUpdateItem(product, quantity);
        cart = cartDataAccessService.saveCart(cart);
        CartDTO cartDTO = cartDTOMapper.apply(cart);

        return new CartResponse(cart.getId(), cartDTO);
    }

    public CartDTO getCart(UUID cartId){
        Cart cart = cartDataAccessService.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found"));
        return cartDTOMapper.apply(cart);
    }

    public CartDTO removeItemFromCart(UUID cartId, UUID productId) {
        Cart cart = cartDataAccessService.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found"));
        cart.removeItem(productId);
        cart = cartDataAccessService.saveCart(cart);
        return cartDTOMapper.apply(cart);
    }

    public void validateCart(UUID cartId) {
        Cart cart = cartDataAccessService.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found"));

        boolean changesDetected = false;
        for (CartItem item : cart.getItems()) {
            Product product = productDataAccessService.selectProductById(item.getProduct().getId())
                    .orElseThrow(() -> new ProductNotFound("Product not found: " + item.getProduct().getId()));

            // Check if product quantity exceeds available stock
            if (item.getQuantity() > product.getStock()) {
                item.setQuantity(product.getStock());
                item.setTotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                changesDetected = true;
            }

            // Check if product price has changed
            if (item.getPrice().compareTo(product.getPrice()) != 0) {
                item.setPrice(product.getPrice());
                item.setTotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                changesDetected = true;
            }
        }

        // Recalculate cart totals
        cart.recalculateTotals();
        cartDataAccessService.saveCart(cart);

        if (changesDetected) {
            throw new InvalidCartException("Cart has changed. Please review the changes.");
        }
    }

}
