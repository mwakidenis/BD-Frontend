export const dynamic = "force-dynamic";
import UserProfile from "@/components/dashboard/user/UserProfile";
import { getCurrentUser } from "@/services/auth";
import { getUserOrders } from "@/services/order";
import { getSpecificUserProductReview } from "@/services/review";

const UserDashboardPage = async () => {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("User is not logged in");
  }

  const { data: userOrders } = await getUserOrders(user.id);
  const sanitizedOrders = Array.isArray(userOrders) ? userOrders : [];

  const { data: userReviews } = await getSpecificUserProductReview(user.id);
  const sanitizedReviews = Array.isArray(userReviews) ? userReviews : [];

  return (
    <div className="flex justify-center items-center p-10">
      <UserProfile
        user={user}
        orders={sanitizedOrders}
        reviews={sanitizedReviews}
      />
    </div>
  );
};

export default UserDashboardPage;
