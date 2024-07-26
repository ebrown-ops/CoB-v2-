import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Find the best SMB solutions for your business" />
        <meta name="keywords" content="SMB, business solutions, software, loans, credit cards, HR solutions" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SMB Solutions",
              "url": "https://www.smbsolutions.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.smbsolutions.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}