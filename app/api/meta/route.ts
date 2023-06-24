import metaFetcher from "meta-fetcher"

export async function GET(request: Request) {
  try {
    const url = request.url.split("?url=").pop() as string
    const data = await metaFetcher(url)
    console.log(data)
    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}

// export async function GET(request: Request) {
//   try {
//     const res = await fetch(request.url.split("?url=").pop() as string)

//     const html = await res.text()
//     const description = html
//       .match(/<meta.*?>/g)
//       ?.find((meta) => {
//         return meta.match(/name="description"/g)
//       })
//       ?.match(/content="(.*)"/)?.[1]

//     // possible values for rel attribute of link tag for favicon
//     const iconRelValues = [
//       "icon",
//       "shortcut icon",
//       "apple-touch-icon",
//       "apple-touch-icon-precomposed",
//       "fluid-icon",
//       "mask-icon",
//     ]

//     // find all link tags
//     const matchResult = html.match(/<link.*?>/g)
//     // find link tag with rel attribute value of icon
//     const faviconLink = matchResult?.find((link) => {
//       return iconRelValues.some((relValue) =>
//         link.match(new RegExp(`rel="${relValue}"`, "g"))
//       )
//     })
//     // get href attribute from link tag
//     const faviconHref = faviconLink?.match(/href="([^"]+)"/)?.[1]

//     // get top level domain from any given URL
//     const url = new URL(request.url.split("?url=").pop() as string)

//     // if favicon does not start with http, then it is a relative path
//     let favicon = faviconHref
//     if (faviconHref && faviconHref[0] !== "h") {
//       const cleanHref =
//         faviconHref && faviconHref[0] === "/" ? faviconHref : "/" + faviconHref
//       favicon = url.origin + cleanHref
//     }

//     const title = html.match(/<title>(.*)<\/title>/)?.[1]
//     const metadata = html.match(/<meta.*?>/g)
//     const ogtitle = metadata?.find((meta) => meta.match(/property="og:title"/g))
//     const ogdescription = metadata?.find((meta) =>
//       meta.match(/property="og:description"/g)
//     )
//     let ogimage = metadata?.find((meta) => meta.match(/property="og:image"/g))

//     // if ogImage does not start with http, then it is a relative path
//     if (ogimage && ogimage.match(/content="([^"]+)"/)?.[1][0] !== "h") {
//       const filteredLinks = matchResult?.filter((link) => {
//         return link.match(/href="\/\/[^"]+"/)
//       })
//       console.log({ filteredLinks })
//       const ogimageHref = ogimage.match(/content="([^"]+)"/)?.[1]
//       const cleanHref =
//         ogimageHref && ogimageHref[0] === "/" ? ogimageHref : "/" + ogimageHref
//       ogimage = url.origin + cleanHref
//     } else {
//       ogimage = ogimage?.match(/content="(.*)"/)?.[1]
//     }

//     console.log({ ogimage })
//     // console.log({ favicon })

//     const ogurl = metadata?.find((meta) => meta.match(/property="og:url"/g))

//     const data = {
//       title,
//       description,
//       favicon,
//       ogTitle: ogtitle?.match(/content="(.*)"/)?.[1],
//       ogDescription: ogdescription?.match(/content="(.*)"/)?.[1],
//       ogImage: ogimage,
//       ogUrl: ogurl?.match(/content="(.*)"/)?.[1],
//     }

//     // console.log(data)

//     return new Response(JSON.stringify(data))
//   } catch (error) {
//     return new Response(JSON.stringify(error))
//   }
// }
