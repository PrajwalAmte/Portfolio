import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ExternalLink, AlertCircle, Clock } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';

interface BlogSectionProps {
  githubConfig: {
    username: string;
    repo: string;
    branch: string;
    blogsPath: string;
  };
  accentColor?: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({ githubConfig, accentColor = 'var(--accent-warning)' }) => {
  const { posts, loading, error } = useBlogPosts(
    githubConfig.username,
    githubConfig.repo,
    githubConfig.branch,
    githubConfig.blogsPath
  );
  const [showAllPosts, setShowAllPosts] = React.useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const contentWithoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
    const plainText = contentWithoutFrontmatter
      .replace(/[#*`_~\[\]]/g, '')
      .replace(/\n+/g, ' ')
      .trim();
    
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength).trim() + '...';
    }
    
    return plainText;
  };

  const displayedPosts = showAllPosts ? posts : posts.slice(0, 6);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center py-12">
          <motion.div
            className="w-16 h-16 rounded-full"
            style={{
              border: `3px solid ${accentColor}`,
              borderTopColor: 'transparent',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-xl"
          style={{ borderColor: 'var(--accent-danger)' }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={24} style={{ color: 'var(--accent-danger)' }} />
            <div>
              <h4 className="font-heading font-semibold mb-2" style={{ color: 'var(--accent-danger)' }}>
                Unable to load research notes
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {error}. Verify the repository configuration and network connection.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {!loading && !error && posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 glass-panel rounded-xl"
          style={{ borderColor: 'var(--border-medium)' }}
        >
          <BookOpen size={64} className="mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h4 className="text-xl font-heading font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            No Research Notes Found
          </h4>
          <p style={{ color: 'var(--text-secondary)' }}>
            Create markdown files in your repository to share your findings.
          </p>
        </motion.div>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {displayedPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-xl p-6 hover:scale-[1.02] transition-transform"
                style={{ 
                  borderColor: `${accentColor}60`,
                  backgroundColor: 'var(--surface-glass)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  boxShadow: `0 0 30px ${accentColor}40`,
                  borderColor: `${accentColor}80`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={16} style={{ color: accentColor }} />
                  <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>
                    {formatDate(post.date)}
                  </span>
                </div>

                <h4 className="text-xl font-heading font-bold mb-3" style={{ 
                  color: accentColor,
                  textShadow: `0 0 15px ${accentColor}40`,
                }}>
                  {post.title}
                </h4>

                <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: 'var(--text-primary)' }}>
                  {getExcerpt(post.content, 200)}
                </p>

                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <a
                    href={`https://github.com/${githubConfig.username}/${githubConfig.repo}/blob/${githubConfig.branch}/${githubConfig.blogsPath}/${post.slug}.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:scale-105 transition-transform font-mono text-sm"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      border: `1px solid ${accentColor}60`,
                    }}
                  >
                    Read More
                    <ExternalLink size={14} />
                  </a>

                  <motion.div
                    className="flex items-center gap-2 text-xs font-mono"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <Clock size={12} />
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min</span>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>

          {posts.length > 6 && !showAllPosts && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setShowAllPosts(true)}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-heading font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, var(--accent-plasma))`,
                  color: 'white',
                  boxShadow: `0 0 20px ${accentColor}40`,
                }}
              >
                <BookOpen size={20} />
                Load All Notes ({posts.length})
              </button>
            </motion.div>
          )}

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href={`https://github.com/${githubConfig.username}/${githubConfig.repo}/tree/${githubConfig.branch}/${githubConfig.blogsPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono hover:scale-105 transition-transform"
              style={{ color: 'var(--text-tertiary)' }}
            >
              View full archive on GitHub
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default BlogSection;
