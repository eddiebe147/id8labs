/**
 * GitHub API Helper
 *
 * Handles collaborator management for agent kit delivery.
 * Uses GitHub REST API directly (no Octokit dependency).
 */

const GITHUB_API_BASE = 'https://api.github.com'

interface GitHubConfig {
  token: string
  owner: string
  repo: string
}

function getConfig(): GitHubConfig {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_REPO_OWNER || 'eddiebe147'
  const repo = process.env.GITHUB_AGENT_KITS_REPO || 'agent-kits'

  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not configured')
  }

  return { token, owner, repo }
}

/**
 * Validates a GitHub username format
 */
export function isValidGitHubUsername(username: string): boolean {
  // GitHub usernames: 1-39 chars, alphanumeric + hyphens, can't start/end with hyphen
  const pattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/
  return pattern.test(username)
}

/**
 * Check if a GitHub user exists
 */
export async function checkUserExists(username: string): Promise<boolean> {
  const { token } = getConfig()

  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })

    return response.status === 200
  } catch (error) {
    console.error('Error checking GitHub user:', error)
    return false
  }
}

/**
 * Add a collaborator to the agent-kits repo
 * Returns true if successful (either added or already a collaborator)
 */
export async function addRepoCollaborator(
  username: string,
  permission: 'pull' | 'push' | 'admin' = 'pull'
): Promise<{ success: boolean; alreadyCollaborator?: boolean; error?: string }> {
  const { token, owner, repo } = getConfig()

  try {
    // First check if already a collaborator
    const checkResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    // 204 = already a collaborator
    if (checkResponse.status === 204) {
      return { success: true, alreadyCollaborator: true }
    }

    // Add as collaborator (sends invite)
    const addResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permission }),
      }
    )

    // 201 = invitation sent, 204 = already collaborator
    if (addResponse.status === 201 || addResponse.status === 204) {
      return { success: true, alreadyCollaborator: addResponse.status === 204 }
    }

    // Handle errors
    const errorData = await addResponse.json().catch(() => ({}))
    console.error('GitHub API error:', addResponse.status, errorData)

    if (addResponse.status === 404) {
      return { success: false, error: 'GitHub user not found' }
    }

    return {
      success: false,
      error: errorData.message || `GitHub API returned ${addResponse.status}`,
    }
  } catch (error) {
    console.error('Error adding collaborator:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Remove a collaborator from the agent-kits repo
 * Used for refunds or access revocation
 */
export async function removeRepoCollaborator(
  username: string
): Promise<{ success: boolean; error?: string }> {
  const { token, owner, repo } = getConfig()

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    // 204 = successfully removed, 404 = wasn't a collaborator
    if (response.status === 204 || response.status === 404) {
      return { success: true }
    }

    const errorData = await response.json().catch(() => ({}))
    return {
      success: false,
      error: errorData.message || `GitHub API returned ${response.status}`,
    }
  } catch (error) {
    console.error('Error removing collaborator:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Check if a user is a collaborator on the repo
 */
export async function checkCollaboratorStatus(
  username: string
): Promise<{ isCollaborator: boolean; error?: string }> {
  const { token, owner, repo } = getConfig()

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    // 204 = is a collaborator
    return { isCollaborator: response.status === 204 }
  } catch (error) {
    console.error('Error checking collaborator status:', error)
    return {
      isCollaborator: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get pending invitations for the repo
 * Useful for checking if an invite was sent
 */
export async function getPendingInvitations(): Promise<{
  invitations: Array<{ id: number; invitee: { login: string } }>
  error?: string
}> {
  const { token, owner, repo } = getConfig()

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/invitations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    if (response.status === 200) {
      const data = await response.json()
      return { invitations: data }
    }

    return { invitations: [], error: `GitHub API returned ${response.status}` }
  } catch (error) {
    console.error('Error getting invitations:', error)
    return {
      invitations: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
