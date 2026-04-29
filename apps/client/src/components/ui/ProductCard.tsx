// import React, { useState } from 'react';
// import { Card, Skeleton, Button, Badge, Tooltip } from 'antd';
// import {
//   ShoppingCartOutlined,
//   HeartOutlined,
//   HeartFilled
// } from '@ant-design/icons';
// import { cn } from '../../lib/utils';
// import type { Product } from '../../types/product';
// import PriceDisplay from './PriceDisplay';
// import RatingStars from './RatingStars';

// export interface ProductCardProps {
//   product: Product;
//   loading?: boolean;
//   onAddToCart?: (product: Product) => void;
//   onClick?: (product: Product) => void;
//   onWishlist?: (product: Product) => void;
//   className?: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   loading = false,
//   onAddToCart,
//   onClick,
//   onWishlist,
//   className,
// }) => {
//   const [hovered, setHovered] = useState(false);
//   const [wishlisted, setWishlisted] = useState(false);

//   const isOnSale = !!product.originalPrice && product.originalPrice > product.price;
//   const isOutOfStock = product.stock === 0;

//   if (loading) {
//     return (
//       <Card
//         className="w-full overflow-hidden border-[#E8E8E2]"
//         cover={<Skeleton.Image active className="!w-full !h-[260px]" />}
//       >
//         <Skeleton active paragraph={{ rows: 2 }} title={false} />
//       </Card>
//     );
//   }

//   // The image shown depends on hover state (index 1 if available)
//   const displayImage = hovered && product.images.length > 1 ? product.images[1] : product.images[0];

//   return (
//     <Badge.Ribbon
//       text="SALE"
//       color="#E74C3C"
//       className={cn(!isOnSale && 'hidden')}
//     >
//       <Card
//         hoverable
//         className={cn('overflow-hidden border-[#E8E8E2] group', className)}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         onClick={() => onClick?.(product)}
//         bodyStyle={{ padding: '12px' }}
//         cover={
//           <div className="relative overflow-hidden bg-[#F7F7F5]" style={{ aspectRatio: '3/4' }}>
//             <img
//               src={displayImage}
//               alt={product.name}
//               className={cn(
//                 'w-full h-full object-cover transition-transform duration-500',
//                 hovered ? 'scale-105' : 'scale-100'
//               )}
//             />

//             {/* Out of stock overlay */}
//             {isOutOfStock && (
//               <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
//                 <span className="text-sm font-medium text-[#6B6B6B]">Out of stock</span>
//               </div>
//             )}

//             {/* Wishlist Button */}
//             <Button
//               type="text"
//               shape="circle"
//               icon={wishlisted ? <HeartFilled className="text-[#E74C3C]" /> : <HeartOutlined />}
//               className={cn(
//                 'absolute top-2.5 right-2.5 z-20 bg-white shadow-sm border border-[#E8E8E2]',
//                 'transition-opacity duration-200',
//                 hovered ? 'opacity-100' : 'opacity-0'
//               )}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setWishlisted(!wishlisted);
//                 onWishlist?.(product);
//               }}
//             />

//             {/* Quick Add Button */}
//             {!isOutOfStock && (
//               <div className={cn(
//                 'absolute bottom-2.5 left-2.5 right-2.5 z-20 transition-all duration-300',
//                 hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
//               )}>
//                 <Button
//                   type="primary"
//                   block
//                   icon={<ShoppingCartOutlined />}
//                   className="bg-[#1A1A1A] hover:!bg-[#333333] border-none h-9 text-xs font-medium"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onAddToCart?.(product);
//                   }}
//                 >
//                   Add to cart
//                 </Button>
//               </div>
//             )}
//           </div>
//         }
//       >
//         {/* Product Info */}
//         <div className="flex flex-col gap-1">
//           {product.brand && (
//             <span className="text-[10px] text-[#6B6B6B] uppercase tracking-widest font-bold">
//               {product.brand}
//             </span>
//           )}

//           <p className="text-sm font-medium text-[#1A1A1A] leading-tight line-clamp-2 min-h-[40px] m-0">
//             {product.name}
//           </p>

//           <div className="mt-1">
//             <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
//           </div>

//           <div className="mt-1">
//             <PriceDisplay
//               price={product.price}
//               originalPrice={product.originalPrice}
//               size="sm"
//             />
//           </div>
//         </div>
//       </Card>
//     </Badge.Ribbon>
//   );
// };

// export default ProductCard;
