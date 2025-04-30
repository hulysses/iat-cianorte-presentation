import { getHomeData } from "@/app/actions/home/actions";
import { userIsAdmin } from "@/app/actions/users/actions";
import HomePage from "./home-page";

export default async function Home() {
  const { data: homeData, totals } = await getHomeData();
  const userIsAdminResult = await userIsAdmin();

  return (
    <HomePage
      goalLicensesType={totals?.goal_licenses ?? 0}
      licensesIssuedType={totals?.licenses_issued ?? 0}
      servicesPerformedType={totals?.services_performed ?? 0}
      animalsAttendType={totals?.animals_attend ?? 0}
      userIsAdmin={userIsAdminResult?.data?.is_admin}
      initialHomeDataList={homeData || []}
    />
  );
}
