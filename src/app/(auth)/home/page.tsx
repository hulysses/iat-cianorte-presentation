import { getHomeData } from "@/app/actions/home/actions";
import HomePage from "./home-page";

export default async function Home() {
  const { data: homeData } = await getHomeData();

  const goalLicensesType = homeData?.[0]?.goal_licenses ?? 0;
  const licensesIssuedType = homeData?.[0]?.licenses_issued ?? 0;
  const servicesPerformedType = homeData?.[0]?.services_performed ?? 0;
  const animalsAttendType = homeData?.[0]?.animals_attend ?? 0;

  return (
    <HomePage
      goalLicensesType={goalLicensesType}
      licensesIssuedType={licensesIssuedType}
      servicesPerformedType={servicesPerformedType}
      animalsAttendType={animalsAttendType}
    />
  );
}
