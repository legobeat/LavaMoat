const { generateKernel } = require('./generateKernel')
const { createModuleInspector, getDefaultPaths } = require('./generatePolicy')
const { parseForPolicy } = require('./parseForPolicy')
const { LavamoatModuleRecord } = require('./moduleRecord')
const {
  loadPolicy,
  loadPolicyAndApplyOverrides,
  loadPoliciesSync,
} = require('./loadPolicy')
const { mergePolicy } = require('./mergePolicy')
const { applySourceTransforms } = require('./sourceTransforms')
const { makeInitStatsHook } = require('./makeInitStatsHook')
const { codeSampleFromAstNode } = require('./codeSampleFromAstNode')

module.exports = {
  // generating the kernel
  generateKernel,
  // generating lavamoat config
  createModuleInspector,
  parseForPolicy,
  loadPolicy,
  mergePolicy,
  loadPolicyAndApplyOverrides,
  loadPoliciesSync,
  getDefaultPaths,
  applySourceTransforms,
  // module record class
  LavamoatModuleRecord,
  // utils
  makeInitStatsHook,
  codeSampleFromAstNode,
}
