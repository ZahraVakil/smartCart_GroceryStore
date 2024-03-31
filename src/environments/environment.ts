export const environment = {
    baseURL: 'http://localhost:1337/',

    login: 'api/auth/local',
    register: 'api/auth/local/register',
    user_details : 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',
    product_details : 'api/products?pagination[page]=1&pagination[pageSize]=10&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id&filters[product_name][$containsi][0]=',
    product_by_id : 'api/products/id',
    product_to_cart : 'api/carts',
    product_to_wishlist : 'api/wish-lists'
};
