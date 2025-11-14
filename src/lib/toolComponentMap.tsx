/**
 * Maps tool IDs to their corresponding React components
 */

import { Base64Tool } from '@/components/tools/Base64Tool'
import { URLEncoderTool } from '@/components/tools/URLEncoderTool'
import { HTMLEncoderTool } from '@/components/tools/HTMLEncoderTool'
import { HexEncoderTool } from '@/components/tools/HexEncoderTool'
import { BinaryEncoderTool } from '@/components/tools/BinaryEncoderTool'
import { JSONYAMLConverterTool } from '@/components/tools/JSONYAMLConverterTool'
import { JSONCSVConverterTool } from '@/components/tools/JSONCSVConverterTool'
import { JSONXMLConverterTool } from '@/components/tools/JSONXMLConverterTool'
import { NumberBaseConverterTool } from '@/components/tools/NumberBaseConverterTool'
import { ColorConverterTool } from '@/components/tools/ColorConverterTool'
import { MarkdownHTMLConverterTool } from '@/components/tools/MarkdownHTMLConverterTool'
import { TimestampConverterTool } from '@/components/tools/TimestampConverterTool'
import { JSONFormatterTool } from '@/components/tools/JSONFormatterTool'
import { XMLFormatterTool } from '@/components/tools/XMLFormatterTool'
import { RegExpTesterTool } from '@/components/tools/RegExpTesterTool'
import { JWTDecoderTool } from '@/components/tools/JWTDecoderTool'
import { UUIDGeneratorTool } from '@/components/tools/UUIDGeneratorTool'
import { HashGeneratorTool } from '@/components/tools/HashGeneratorTool'
import { LoremIpsumGeneratorTool } from '@/components/tools/LoremIpsumGeneratorTool'
import TemperatureConverterTool from '@/components/tools/TemperatureConverterTool'
import CronParserTool from '@/components/tools/CronParserTool'
import StringInspectorTool from '@/components/tools/StringInspectorTool'
import NanoIDGeneratorTool from '@/components/tools/NanoIDGeneratorTool'
import RandomStringGeneratorTool from '@/components/tools/RandomStringGeneratorTool'
import SQLFormatterTool from '@/components/tools/SQLFormatterTool'
import TextDiffTool from '@/components/tools/TextDiffTool'
import HTMLFormatterTool from '@/components/tools/HTMLFormatterTool'
import CSSFormatterTool from '@/components/tools/CSSFormatterTool'
import MarkdownPreviewerTool from '@/components/tools/MarkdownPreviewerTool'
import YAMLValidatorTool from '@/components/tools/YAMLValidatorTool'

export const toolComponentMap: Record<string, React.ComponentType> = {
  // Encoders
  'base64-encoder': Base64Tool,
  'url-encoder': URLEncoderTool,
  'html-encoder': HTMLEncoderTool,
  'hex-encoder': HexEncoderTool,
  'binary-encoder': BinaryEncoderTool,

  // Converters
  'json-yaml-converter': JSONYAMLConverterTool,
  'json-csv-converter': JSONCSVConverterTool,
  'json-xml-converter': JSONXMLConverterTool,
  'number-base-converter': NumberBaseConverterTool,
  'color-converter': ColorConverterTool,
  'markdown-html-converter': MarkdownHTMLConverterTool,
  'timestamp-converter': TimestampConverterTool,
  'temperature-converter': TemperatureConverterTool,

  // Formatters
  'json-formatter': JSONFormatterTool,
  'xml-formatter': XMLFormatterTool,
  'html-formatter': HTMLFormatterTool,
  'sql-formatter': SQLFormatterTool,
  'css-formatter': CSSFormatterTool,
  'markdown-previewer': MarkdownPreviewerTool,

  // Validators
  'regexp-tester': RegExpTesterTool,
  'jwt-decoder': JWTDecoderTool,
  'cron-parser': CronParserTool,
  'string-inspector': StringInspectorTool,
  'text-diff': TextDiffTool,
  'yaml-validator': YAMLValidatorTool,

  // Generators
  'uuid-generator': UUIDGeneratorTool,
  'nanoid-generator': NanoIDGeneratorTool,
  'hash-generator': HashGeneratorTool,
  'lorem-generator': LoremIpsumGeneratorTool,
  'random-string-generator': RandomStringGeneratorTool,
}
