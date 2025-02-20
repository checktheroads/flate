import Build from './Build'

import { IBuildInsomnia } from './types'

export default class BuildInsomnia extends Build implements IBuildInsomnia {
  /**
   * @method createVariants
   *
   * Create new theme variants.
   */
  createVariants(): string {
    this.theme.final[
      `${this.theme.stage.variant}.${this.settings.fileType}`
    ] = this.theme.stage

    return 'created'
  }

  /**
   * @function merge
   *
   * Where the magic happens.
   *
   * @param theme
   */
  merge(theme: any): void {
    this.theme.stage = theme
    this.setColors().createVariants()
  }

  /**
   * @method stage
   *
   * Stage method where the finishing touches are applied.
   */
  stage(): void {
    this.listThemes.forEach(themeName => {
      this.merge({
        ...this.getFile(`${this.rootDir.themes}/common/base.json`),
        ...this.getFile(`${this.rootDir.themes}/${themeName}`),
      })
    })
  }

  /**
   * @method compile
   *
   * Responsible for the construction.
   */
  compile(): string {
    this.stage()

    if (this.theme.final) {
      Object.entries(this.theme.final).map(([name, theme]) =>
        this.createFile({
          path: this.rootDir.build,
          file: theme,
          fileName: name,
        }),
      )
    }

    return 'done'
  }
}
