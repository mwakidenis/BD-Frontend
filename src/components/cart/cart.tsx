"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ImageUp, ShoppingCart } from "lucide-react";
import {
  addOrderInfo,
  addPrescription,
  clearCart,
  decreaseQuanity,
  increaseQuanity,
  orderSelector,
  removeItemFromCart,
  specificProductQuantitySelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TMedicineResponse } from "@/types/product";
import { imageToLink } from "@/services/product";
import ImagePreviewer from "../dashboard/admin/CreateProduct/ImagePreviewer";
import ImageUploader from "../dashboard/admin/CreateProduct/ImageUploader";

const Cart = ({ medicines }: { medicines: TMedicineResponse[] }) => {
  const router = useRouter();

  const orderInfo = useAppSelector(orderSelector);

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);

  const [imagePreview, setImagePreview] = useState<string[]>(
    orderInfo?.prescription ? [orderInfo.prescription] : []
  );

  const [prescription, setPrescription] = useState<string>(
    orderInfo?.prescription ? orderInfo.prescription : ""
  );
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("image", imageFiles[0]);

      const res = await imageToLink(formData);

      const imgUrl = res?.data?.url;

      if (imgUrl) {
        setPrescription(imgUrl);
        dispatch(addPrescription(imgUrl));
      }
    };

    if (imageFiles.length > 0) {
      uploadImage();
    }
  }, [imageFiles]);

  const [shippingInfo, setShippingInfo] = useState(orderInfo.shippingInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    if (shippingInfo) {
      dispatch(
        addOrderInfo({
          shippingInfo,
        })
      );
    }
  };

  const { items: cartItems, totalPrice } = useAppSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (id: string) => {
    const specificMedicine = medicines?.find((medicine) => medicine._id === id);

    if (!specificMedicine) {
      toast.error("Medicine not found");
      return;
    }

    const cartedProductQuantity = cartItems.find(
      (cartItem) => cartItem.id === id
    )?.quantity as number;

    if (cartedProductQuantity >= specificMedicine.quantity) {
      toast.error("Maximum amount carted");
    } else {
      dispatch(increaseQuanity(id));
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);

    if (item && item.quantity > 1) {
      dispatch(decreaseQuanity(id));
    } else {
      toast.warning("Quantity can't go below 1");
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (prescription) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [prescription]);

  const handleSubmit = () => {
    if (cartItems.length > 0) {
      if (cartItems.some((cart) => cart.prescription) && prescription) {
        dispatch(
          addOrderInfo({
            shippingInfo,
          })
        );

        router.push("/user/checkout");
      } else if (cartItems.some((cart) => cart.prescription) && !prescription) {
        toast.warning("Image Upload Error");
      } else {
        dispatch(
          addOrderInfo({
            shippingInfo,
          })
        );
        router.push("/user/checkout");
      }
    } else {
      toast.warning("No Product in CART");
    }
  };

  return (
    <div className="flex justify-center items-center lg:min-h-screen my-10">
      {" "}
      {cartItems.length > 0 ? (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="shadow-sm border border-muted bg-card"
              >
                <CardContent className="flex flex-col sm:flex-row gap-4 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-28 h-28 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                    <p className="text-sm mt-1">{item.description}</p>
                    <p className="text-base font-medium mt-2 text-primary">
                      ৳{item.price.toFixed(2)}
                    </p>
                    {item.prescription && (
                      <p className="text-sm mt-3 text-destructive flex items-center gap-2 font-semibold">
                        PRESCRIPTION <ImageUp size={16} />
                      </p>
                    )}
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-3 justify-between sm:justify-start">
                    <Button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      variant="ghost"
                      size="icon"
                    >
                      <Minus size={16} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      variant="ghost"
                      size="icon"
                    >
                      <Plus size={16} />
                    </Button>
                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary Section */}
          <Card className="h-fit border border-muted shadow-md bg-card">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-bold">Order Summary</h2>

              <ul className="space-y-1 text-sm">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      x{item.quantity} {item.name}
                    </span>
                    <span>৳{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <Separator />

              {/* Shipping Inputs */}
              <div className="text-sm space-y-2">
                <p>Delivery Address</p>
                <Input
                  name="shippingAddress"
                  placeholder="Address"
                  value={shippingInfo.shippingAddress}
                  onChange={handleChange}
                />
                <Input
                  name="shippingCity"
                  placeholder="City"
                  value={shippingInfo.shippingCity}
                  onChange={handleChange}
                />
              </div>

              <Separator />

              <div className="text-sm flex justify-between">
                <span>Shipping</span>
                <span>৳ 60.00</span>
              </div>

              <Separator />

              <div className="text-base font-semibold flex justify-between">
                <span>Total</span>
                <span>৳ {(totalPrice + 60).toFixed(2)}</span>
              </div>

              {/* Prescription Upload */}
              {cartItems.some((cart) => cart.prescription) && (
                <div className="mt-6">
                  {imagePreview.length > 0 ? (
                    <ImagePreviewer
                      setImageFiles={setImageFiles}
                      imagePreview={imagePreview}
                      setImagePreview={setImagePreview}
                    />
                  ) : (
                    <ImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Prescription"
                    />
                  )}
                </div>
              )}

              {/* Upload Success Message */}
              {showMessage && (
                <small className="text-center block font-semibold text-sm text-green-600">
                  Image uploaded successfully
                </small>
              )}

              {/* Checkout Button */}
              {shippingInfo.shippingAddress && shippingInfo.shippingCity ? (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    cartItems.some((cart) => cart.prescription) && !prescription
                  }
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Checkout
                </Button>
              ) : (
                <p className="text-yellow-600 font-medium text-center">
                  Shipping Address Required!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className=" min-h-[50vh] flex justify-center items-center">
          <p className="text-black font-semibold text-2xl">
            No Items in Cart <ShoppingCart size={100} />
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
