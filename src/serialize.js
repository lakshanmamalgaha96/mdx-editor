import {compile} from '@mdx-js/mdx'
import {VFile} from 'vfile'
import {matter} from 'vfile-matter'

function getCompileOptions(
    mdxOptions = {},
    rsc = false
) {

    // don't modify the original object when adding our own plugin
    // this allows code to reuse the same options object
    const remarkPlugins = [
        ...(mdxOptions.remarkPlugins || []),
    ]

    return {
        ...mdxOptions,
        remarkPlugins,
        outputFormat: 'function-body',
        // Disable the importSource option for RSC to ensure there's no `useMDXComponents` implemented.
        providerImportSource: rsc ? undefined : '@mdx-js/react',
    }
}

/**
 * Parses and compiles the provided MDX string. Returns a result which can be passed into <MDXRemote /> to be rendered.
 */
export async function serialize(
    source,
    scope = {},
    mdxOptions = {},
    parseFrontmatter = false,
    rsc = false
) {
    const vfile = new VFile(source)

    // makes frontmatter available via vfile.data.matter
    if (parseFrontmatter) {
        matter(vfile, {strip: true})
    }

    let compiledMdx

    try {
        compiledMdx = await compile(vfile, getCompileOptions(mdxOptions, rsc))
    } catch (error) {
        throw error
    }

    let compiledSource = String(compiledMdx)

    return {
        compiledSource,
        frontmatter: (vfile.data.matter ?? {}),
        scope
    }
}