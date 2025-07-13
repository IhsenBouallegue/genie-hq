import UnsubscribePageClient from "./unsubscribe-page-client";

const UnsubscribePage = async (props: { searchParams: Promise<{ email?: string }> }) => {
  const searchParams = await props.searchParams;
  const email = searchParams.email || null;

  return <UnsubscribePageClient email={email} />;
};

export default UnsubscribePage;
