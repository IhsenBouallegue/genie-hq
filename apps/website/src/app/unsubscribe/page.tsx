import UnsubscribePageClient from "./unsubscribe-page-client";

const UnsubscribePage = ({
  searchParams,
}: { searchParams: { email?: string } }) => {
  const email = searchParams.email || null;

  return <UnsubscribePageClient email={email} />;
};

export default UnsubscribePage;
