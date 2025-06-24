import { describe, it, expect, beforeEach } from 'vitest'

describe('Project Manager Verification Contract', () => {
  let contractState
  
  beforeEach(() => {
    // Mock contract state
    contractState = {
      verifiedManagers: new Map(),
      managerProjects: new Map(),
      contractOwner: 'SP1HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
    }
  })
  
  describe('verify-manager function', () => {
    it('should successfully verify a new manager', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      const licenseNumber = 'LIC123456'
      const experienceYears = 10
      const specialization = 'Commercial Construction'
      
      // Simulate contract call
      const result = verifyManager(
          contractState,
          manager,
          licenseNumber,
          experienceYears,
          specialization,
          contractState.contractOwner
      )
      
      expect(result.success).toBe(true)
      expect(contractState.verifiedManagers.has(manager)).toBe(true)
      
      const managerData = contractState.verifiedManagers.get(manager)
      expect(managerData.licenseNumber).toBe(licenseNumber)
      expect(managerData.experienceYears).toBe(experienceYears)
      expect(managerData.specialization).toBe(specialization)
      expect(managerData.isActive).toBe(true)
    })
    
    it('should reject verification from non-owner', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      const unauthorizedCaller = 'SP3HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      const result = verifyManager(
          contractState,
          manager,
          'LIC123456',
          10,
          'Commercial Construction',
          unauthorizedCaller
      )
      
      expect(result.success).toBe(false)
      expect(result.error).toBe('ERR_UNAUTHORIZED')
    })
    
    it('should reject duplicate manager verification', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      // First verification
      verifyManager(contractState, manager, 'LIC123456', 10, 'Commercial Construction', contractState.contractOwner)
      
      // Second verification attempt
      const result = verifyManager(
          contractState,
          manager,
          'LIC789012',
          15,
          'Residential Construction',
          contractState.contractOwner
      )
      
      expect(result.success).toBe(false)
      expect(result.error).toBe('ERR_ALREADY_VERIFIED')
    })
    
    it('should reject empty license number', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      const result = verifyManager(
          contractState,
          manager,
          '',
          10,
          'Commercial Construction',
          contractState.contractOwner
      )
      
      expect(result.success).toBe(false)
      expect(result.error).toBe('ERR_INVALID_LICENSE')
    })
  })
  
  describe('deactivate-manager function', () => {
    it('should successfully deactivate a verified manager', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      // First verify the manager
      verifyManager(contractState, manager, 'LIC123456', 10, 'Commercial Construction', contractState.contractOwner)
      
      // Then deactivate
      const result = deactivateManager(contractState, manager, contractState.contractOwner)
      
      expect(result.success).toBe(true)
      
      const managerData = contractState.verifiedManagers.get(manager)
      expect(managerData.isActive).toBe(false)
    })
    
    it('should reject deactivation of non-existent manager', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      const result = deactivateManager(contractState, manager, contractState.contractOwner)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe('ERR_NOT_FOUND')
    })
  })
  
  describe('is-verified-manager function', () => {
    it('should return true for active verified manager', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      verifyManager(contractState, manager, 'LIC123456', 10, 'Commercial Construction', contractState.contractOwner)
      
      const result = isVerifiedManager(contractState, manager)
      expect(result).toBe(true)
    })
    
    it('should return false for inactive manager', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      verifyManager(contractState, manager, 'LIC123456', 10, 'Commercial Construction', contractState.contractOwner)
      deactivateManager(contractState, manager, contractState.contractOwner)
      
      const result = isVerifiedManager(contractState, manager)
      expect(result).toBe(false)
    })
    
    it('should return false for non-existent manager', () => {
      const manager = 'SP2HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECNWWALK'
      
      const result = isVerifiedManager(contractState, manager)
      expect(result).toBe(false)
    })
  })
})

// Mock contract functions
function verifyManager(state, manager, licenseNumber, experienceYears, specialization, caller) {
  if (caller !== state.contractOwner) {
    return { success: false, error: 'ERR_UNAUTHORIZED' }
  }
  
  if (state.verifiedManagers.has(manager)) {
    return { success: false, error: 'ERR_ALREADY_VERIFIED' }
  }
  
  if (!licenseNumber || licenseNumber.length === 0) {
    return { success: false, error: 'ERR_INVALID_LICENSE' }
  }
  
  state.verifiedManagers.set(manager, {
    licenseNumber,
    verificationDate: Date.now(),
    experienceYears,
    specialization,
    isActive: true
  })
  
  state.managerProjects.set(manager, {
    projectCount: 0,
    activeProjects: 0
  })
  
  return { success: true }
}

function deactivateManager(state, manager, caller) {
  if (caller !== state.contractOwner) {
    return { success: false, error: 'ERR_UNAUTHORIZED' }
  }
  
  if (!state.verifiedManagers.has(manager)) {
    return { success: false, error: 'ERR_NOT_FOUND' }
  }
  
  const managerData = state.verifiedManagers.get(manager)
  managerData.isActive = false
  state.verifiedManagers.set(manager, managerData)
  
  return { success: true }
}

function isVerifiedManager(state, manager) {
  const managerData = state.verifiedManagers.get(manager)
  return managerData ? managerData.isActive : false
}
