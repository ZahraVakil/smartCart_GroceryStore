export const environment = {
    baseURL: 'http://localhost:1337/',

    login: 'api/auth/local',
    register: 'api/auth/local/register',
    user_details : 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',
    product_details : 'api/products?pagination[page]=1&pagination[pageSize]=10&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id&filters[product_name][$containsi][0]=',
    product_by_id : 'api/products/id',
    product_to_cart : 'api/carts',
    product_to_wishlist : 'api/wish-lists',
    update_user : 'api/users',
    update_address : 'api/user-addresses',
    delete_whislist : 'api/wish-lists/id',
    wishlist_items : 'api/wish-lists?populate=product,user_detail',
    delete_cart : 'api/carts/id',
    delete_address: 'api/user-addresses/id',
    get_address: 'api/user-addresses',
    get_states: 'api/states',
    get_cities_byStates: 'api/cities?=state&filters[state][id][$eq]='

};
