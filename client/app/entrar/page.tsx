import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('./screen'), { ssr: false })

export default () => <NoSSR />