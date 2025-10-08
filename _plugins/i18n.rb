# frozen_string_literal: true

require "i18n"
require "i18n/backend/fallbacks"

module Jekyll
  module I18nSupport
    def self.configure(site)
      locales_dir = File.join(site.source, "_locales")
      locale_files = Dir[File.join(locales_dir, "*.{yml,yaml}")]

      I18n.load_path = (I18n.load_path + locale_files).uniq
      I18n::Backend::Simple.include(I18n::Backend::Fallbacks) unless I18n::Backend::Simple.included_modules.include?(I18n::Backend::Fallbacks)
      I18n.backend.load_translations

      if site.config["languages"].is_a?(Array)
        available = site.config["languages"].map { |entry| entry["code"].to_sym }
        I18n.available_locales = available unless available.empty?
      end

      default_locale = (site.config["default_lang"] || I18n.default_locale).to_sym
      I18n.default_locale = default_locale
    end
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  Jekyll::I18nSupport.configure(site)
end

module Jekyll
  module I18nFilters
    def t(key, options = {})
      site = @context.registers[:site]
      page = @context.registers[:page]

      opts = {}
      if options.respond_to?(:each_pair)
        options.each_pair do |k, value|
          key_sym = k.respond_to?(:to_sym) ? k.to_sym : k
          opts[key_sym] = value
        end
      end

      locale = opts.delete(:locale) || opts.delete("locale") || page["lang"] || site.config["default_lang"] || ::I18n.default_locale
      opts[:locale] = locale.to_sym
      opts[:default] = key unless opts.key?(:default)

      ::I18n.t(key, **opts)
    end
  end
end

Liquid::Template.register_filter(Jekyll::I18nFilters)
