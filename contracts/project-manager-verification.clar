;; Project Manager Verification Contract
;; Validates and manages construction project managers

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_ALREADY_VERIFIED (err u101))
(define-constant ERR_NOT_FOUND (err u102))
(define-constant ERR_INVALID_LICENSE (err u103))

;; Data structures
(define-map verified-managers
  { manager: principal }
  {
    license-number: (string-ascii 50),
    verification-date: uint,
    experience-years: uint,
    specialization: (string-ascii 100),
    is-active: bool
  }
)

(define-map manager-projects
  { manager: principal }
  { project-count: uint, active-projects: uint }
)

;; Public functions
(define-public (verify-manager
  (manager principal)
  (license-number (string-ascii 50))
  (experience-years uint)
  (specialization (string-ascii 100)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (asserts! (is-none (map-get? verified-managers { manager: manager })) ERR_ALREADY_VERIFIED)
    (asserts! (> (len license-number) u0) ERR_INVALID_LICENSE)

    (map-set verified-managers
      { manager: manager }
      {
        license-number: license-number,
        verification-date: block-height,
        experience-years: experience-years,
        specialization: specialization,
        is-active: true
      }
    )

    (map-set manager-projects
      { manager: manager }
      { project-count: u0, active-projects: u0 }
    )

    (ok true)
  )
)

(define-public (deactivate-manager (manager principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (match (map-get? verified-managers { manager: manager })
      manager-data (begin
        (map-set verified-managers
          { manager: manager }
          (merge manager-data { is-active: false })
        )
        (ok true)
      )
      ERR_NOT_FOUND
    )
  )
)

;; Read-only functions
(define-read-only (is-verified-manager (manager principal))
  (match (map-get? verified-managers { manager: manager })
    manager-data (get is-active manager-data)
    false
  )
)

(define-read-only (get-manager-info (manager principal))
  (map-get? verified-managers { manager: manager })
)

(define-read-only (get-manager-projects (manager principal))
  (map-get? manager-projects { manager: manager })
)
